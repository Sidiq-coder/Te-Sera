import express from "express";
import { login, getMe, logout, refreshToken, authenticate, signup } from "./controller.js";


const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/signup", signup);

// Protected routes
router.get("/me", authenticate, getMe);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

export default router;
