import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login({ setUser }) {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const r = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", r.data.token);
      setUser(r.data.user);
      nav("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-title">Login</div>
        <form className="auth-form" onSubmit={submit}>
          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button className="auth-btn">Login</button>
          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export function Register({ setUser }) {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const r = await axios.post("/api/auth/register", form);
      localStorage.setItem("token", r.data.token);
      setUser(r.data.user);
      nav("/");
    } catch (err) {
      setError("Registration failed. Please check your inputs.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-title">Create an Account</div>
        <form className="auth-form" onSubmit={submit}>
          <input
            className="auth-input"
            placeholder="Name"
            onChange={(e)=>setForm({...form, name:e.target.value})}
          />
          <input
            className="auth-input"
            placeholder="Email"
            onChange={(e)=>setForm({...form, email:e.target.value})}
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            onChange={(e)=>setForm({...form, password:e.target.value})}
          />
          <select
            className="auth-select"
            value={form.role}
            onChange={(e)=>setForm({...form, role:e.target.value})}
          >
            <option value="customer">Customer</option>
            <option value="provider">Provider</option>
          </select>
          <button className="auth-btn">Create Account</button>
          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
