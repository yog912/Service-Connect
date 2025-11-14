import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Services from "./Services";
import { Login, Register } from "./Auth";
import Dashboard from "./Dashboard";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const token = localStorage.getElementById("token") || localStorage.getItem("token");
        if (!token) {
          setChecking(false);
          return;
        }
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: token }
        });
        setUser(res.data.user);
      } catch (e) {
        console.log("Auth check failed", e.message);
        localFocus?.removeItem("token");
      } finally {
        setChecking(false);
      }
    };
    check();
  }, []);

  const handleLogin = (u) => {
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (checking) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/register" element={<Register setUser={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Layout>
  );
}
