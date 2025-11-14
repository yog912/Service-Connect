import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ user, onLogout, children }) {
  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <div className="app-logo">Service Connect</div>
          <nav className="app-nav">
            <Link to="/">Services</Link>
            {/* we keep dashboard link for future, but it\'s optional */}
            {/* {user && <Link to="/dashboard">Dashboard</Link>} */}
            {!user && <Link to="/login">Login</Link>}
            {!user && <Link to="/register">Register</Link>}
            {user && (
              <button className="app-logout-btn" onClick={onLogout}>
                Logout
              </button>
            )}
          </nav>
        </header>
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
}
