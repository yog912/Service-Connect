import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Services from "./Services";
import { Login, Register } from "./Auth";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(null);

  const loadMe = async () => {
    try {
      const r = await axios.get("/api/auth/me", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setUser(r.data.user);
    } catch (err) {}
  };

  useEffect(() => {
    if (localStorage.getItem("token")) loadMe();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Layout user={user} onLogout={logout}>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Layout>
  );
}
