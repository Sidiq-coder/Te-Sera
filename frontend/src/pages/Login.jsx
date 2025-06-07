import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; 
import Navbar from "../components/Navbar.jsx";
import AuthFormField from "../components/AuthFormField.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        if (login) {
          login(response.data.user, response.data.accessToken);
        }
        console.log(response);

        navigate("/dashboard");
      } 
    } catch (error) {
      console.error("Login failed", error);
      setError(
        error.response?.data?.message || 
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-center">
              Welcome Back to{" "}
              <span className="text-[#ff5835] italic font-lora">tesera</span>
            </h1>
            <p className="text-sm text-gray-600 text-center mt-2 font-inter">
              Log in to continue your journey in tech. Access your personalized
              dashboard, connect with the community, create posts, enroll in
              courses, and stay up-to-date with the latest in programming
            </p>
          </div>
  {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <AuthFormField
              label="Username or Email"
              type="text"
              id="username"
              placeholder="username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />
            <AuthFormField
              label="Password"
              type="password"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-purple-600 font-medium hover:underline"
            >
              Sign Up Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;



