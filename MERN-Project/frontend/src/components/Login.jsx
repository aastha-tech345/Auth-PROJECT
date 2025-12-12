import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const { email, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email, password, or phone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary bg-gradient">
      <div className="card p-4 shadow" style={{ width: "24rem" }}>
        <h2 className="card-title text-center mb-2 text-primary">Welcome Back</h2>
        <p className="text-center text-secondary mb-4">
          Sign in to access your dashboard
        </p>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={login}
          disabled={loading}
          className={`btn btn-primary w-100 ${loading ? "disabled" : ""}`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-3 text-center text-secondary">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary text-decoration-underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}
