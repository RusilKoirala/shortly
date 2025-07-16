import React, { useState, useContext } from "react";
import axios from "../api/Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.data, res.data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
      setForm({ email: "", password: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-black font-geist">
      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg className="w-full h-full opacity-10" style={{filter:'blur(1px)'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <ToastContainer />
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fadein">
        <h2 className="text-3xl font-bold mb-6 text-center font-satoshi text-white">Sign in to Shortly</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white font-geist bg-zinc-900 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white font-geist bg-zinc-900 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded font-satoshi text-lg font-semibold hover:bg-gray-200 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
