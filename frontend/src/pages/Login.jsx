import { useState } from "react";
import api from "../lib/axios.js";
import AuthFormField from "../components/AuthFormField.jsx";
import Navbar from "../components/Navbar.jsx";


const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      console.log("Login success:", res.data);
      // redirect or store token here
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-center">
            Welcome Back to <span className="text-[#ff5835] italic font-lora">tesera</span>
          </h1>
          <p className="text-sm text-gray-600 text-center mt-2 font-inter">
            Log in to continue your journey in tech. Access your personalized dashboard, connect with the community, create posts, enroll in courses, and stay up-to-date with the latest in programming
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <AuthFormField
            label="Username or Email"
            type="text"
            id="username"
            placeholder="username or email"
            value={form.username}
            onChange={handleChange}
          />
          <AuthFormField
            label="Password"
            type="password"
            id="password"
            placeholder="******"
            value={form.password}
            onChange={handleChange}
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
          <a href="/register" className="text-purple-600 font-medium hover:underline">
            Sign Up Now
          </a>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
