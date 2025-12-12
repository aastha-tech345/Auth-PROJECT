import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const { name, email, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      toast.success(res.data.msg || "Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary bg-gradient">
      <div className="card p-4 shadow" style={{ width: "24rem" }}>
        <h2 className="card-title text-center mb-4 text-primary">Create Account</h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-3 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 mt-1 me-1"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className={`btn btn-primary w-100 ${loading ? "disabled" : ""}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-3 text-center text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="text-primary text-decoration-underline">
            Login
          </Link>
        </p>
      </div>

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
