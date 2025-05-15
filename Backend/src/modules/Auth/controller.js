
import jwt from 'jsonwebtoken';
import prisma from "../../../prisma/prismaClient.js";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret';
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || '15m';
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || '7d';
const SESSION_EXPIRES_DAYS = process.env.SESSION_EXPIRES_DAYS || 7;

// Helper untuk generate tokens
const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES }
  );
  
  const refreshToken = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES }
  );

  return { accessToken, refreshToken };
};

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user dengan relasi
    const user = await prisma.user.findUnique({
      where: { username }
    });

    // Validasi user
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Validasi password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    // Hitung expiry date
    const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 menit
    const refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
    const sessionExpires = new Date(Date.now() + SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

    // Buat session
    const sessionToken = uuidv4();
    
    // Simpan semua token ke database dalam transaction
    await prisma.$transaction([
      prisma.authToken.create({
        data: {
          accessToken,
          refreshToken,
          accessTokenExpires,
          refreshTokenExpires,
          userId: user.id
        }
      }),
      prisma.session.create({
        data: {
          sessionToken,
          accessToken,
          refreshToken,
          expires: sessionExpires,
          userId: user.id
        }
      })
    ]);

    // Set HTTP-only cookies untuk session
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
      expires: sessionExpires
    });

    // Response dengan data user dan tokens (untuk client yang membutuhkan)
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      nama: user.nama,
      foto: user.foto,
    };

    res.json({
      accessToken, // Tetap dikirim untuk client yang butuh
      refreshToken, // Tetap dikirim untuk client yang butuh
      expiresIn: 900, // 15 menit dalam detik
      tokenType: 'Bearer',
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const signup = async (req, res) => {
  try {
    const { 
      username, 
      password, 
      email, 
      nama, 
      tanggalLahir, 
      alamatTinggal, 
      foto 
    } = req.body;

    // Validate required fields
    if (!username || !password || !email || !nama || !tanggalLahir) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: existingUser.username === username 
          ? 'Username already exists' 
          : 'Email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        nama,
        tanggalLahir: new Date(tanggalLahir),
        alamatTinggal: alamatTinggal || null,
        foto: foto || null
          }
    });

    // Generate tokens (optional - you might want to log them in immediately)
    const { accessToken, refreshToken } = generateTokens(newUser.id);

    // Response with user data (excluding sensitive information)
    const userData = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      nama: newUser.nama,
      foto: newUser.foto,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userData,
      // Include tokens if you want to log them in immediately
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle Prisma validation errors
    if (error.code === 'P2002') {
      return res.status(409).json({ 
        error: 'Username or email already exists' 
      });
    }
    
    if (error.name === 'PrismaClientValidationError') {
      return res.status(400).json({ 
        error: 'Invalid data format' 
      });
    }
    
    res.status(500).json({ 
      error: 'Registration failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Middleware untuk auth hybrid
const authenticate = async (req, res, next) => {
  try {
    // Coba dapatkan token dari header atau cookie session
    let accessToken = req.headers.authorization?.split(' ')[1];
    let sessionToken = req.cookies.sessionToken;

    // Jika tidak ada token di header, coba dari session
    if (!accessToken && sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        select: {
          accessToken: true,
          expires: true,
          user: {
            select: {
              id: true,
              role: true
            }
          }
        }
      });

      if (!session || new Date(session.expires) < new Date()) {
        // Hapus cookie jika session expired
        res.clearCookie('sessionToken');
        return res.status(401).json({ error: 'Session expired' });
      }

      accessToken = session.accessToken;
    }

    if (!accessToken) {
      return res.status(401).json({ error: 'Authorization required' });
    }

    // Verify token
    const decoded = jwt.verify(accessToken, JWT_SECRET);

    // Cek di database
    const tokenValid = await prisma.authToken.findFirst({
      where: {
        accessToken,
        revoked: false,
        accessTokenExpires: { gt: new Date() },
        userId: decoded.userId
      }
    });

    if (!tokenValid) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach user ke request
    req.user = {
      userId: decoded.userId,
      accessToken
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Get Current User Data
const getMe = async (req, res) => {
    try {
      // Gunakan ID dari user yang sudah terautentikasi (req.user.userId)
      const userId = req.user.userId; // Tidak perlu parseInt karena sudah number
      
      const tokenValid = await prisma.authToken.findFirst({
        where: {
          accessToken: req.user.token,
          revoked: false
        }
      });
  
      if (!tokenValid) {
        return res.status(401).json({ error: 'Session expired' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          nama: true,
          foto: true
                }
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const response = {
        id: user.id,
        username: user.username,
        email: user.email,
        nama: user.nama,
        foto: user.foto
          };
  
      res.json(response);
    } catch (error) {
      console.error('GetMe error:', error);
      res.status(500).json({ error: 'Failed to get user data' });
    }
  };

// Logout
const logout = async (req, res) => {
    try {
      // Validasi req.user
      if (!req.user || !req.user.userId) {
        console.error('Logout error: No user data in request');
        return res.status(401).json({ 
          success: false,
          message: 'Not authenticated' 
        });
      }
  
      const { userId, token } = req.user;
  
      // Hapus token dari database
      await prisma.authToken.deleteMany({
        where: {
          OR: [
            { userId },
            { accessToken: token }
          ]
        }
      });
  
      // Hapus session jika menggunakan session
      if (req.session) {
        await prisma.session.deleteMany({
          where: { userId }
        });
      }
  
      // Hapus cookie jika ada
      res.clearCookie('token');
      res.clearCookie('sessionToken');
  
      res.json({ 
        success: true,
        message: 'Logout successful' 
      });
  
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Logout failed',
        error: error.message 
      });
    }
  };

// Refresh Token
const refreshToken = async (req, res) => {
  try {
    // Dapatkan refresh token dari body atau session cookie
    let { refreshToken } = req.body;
    const sessionToken = req.cookies.sessionToken;

    if (!refreshToken && sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        select: { refreshToken: true }
      });
      if (session) refreshToken = session.refreshToken;
    }

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    // Verifikasi token
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    
    // Cek di database
    const tokenRecord = await prisma.authToken.findFirst({
      where: { 
        refreshToken,
        revoked: false,
        refreshTokenExpires: { gt: new Date() },
        userId: decoded.userId
      }
    });

    if (!tokenRecord) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(
      decoded.userId
    );

    // Update semua token di database dalam transaction
    await prisma.$transaction([
      prisma.authToken.update({
        where: { id: tokenRecord.id },
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accessTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
          refreshTokenExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      }),
      prisma.session.updateMany({
        where: { 
          userId: decoded.userId,
          refreshToken 
        },
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expires: new Date(Date.now() + SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000)
        }
      })
    ]);

    // Update session cookie jika ada
    if (sessionToken) {
      res.cookie('sessionToken', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000)
      });
    }

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: 900
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ error: 'Refresh token failed' });
  }
};

export {
  login,
  getMe,
  signup,
  logout,
  refreshToken,
  authenticate
};

