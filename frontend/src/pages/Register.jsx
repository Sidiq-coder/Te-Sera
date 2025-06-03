import { useState } from "react";
import api from "../lib/axios.js";
import AuthFormField from "../components/AuthFormField.jsx";
import Navbar from "../components/Navbar.jsx";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  

    try {
      const res = await api.post("/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      console.log("Register success:", res.data);
      // Redirect to login or auto-login
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-center">
              Join the <span className="text-[#ff5835] italic">tesera</span>{" "}
              Community
            </h1>
            <p className="text-sm text-gray-600 text-center mt-2">
              Create your free account and become part of a growing tech
              ecosystem.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <AuthFormField
              label="Username"
              type="text"
              id="username"
              placeholder="spiderman"
              value={form.username}
              onChange={handleChange}
            />
            <AuthFormField
              label="Email"
              type="email"
              id="email"
              placeholder="peter@gmail.com"
              value={form.email}
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
            <AuthFormField
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="******"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>  
    </>
  );
};

export default Register;
