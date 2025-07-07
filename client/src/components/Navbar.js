import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ color: "#007bff", margin: 0 }}>Job Board</h2>

      <div style={linkContainer}>
        {!user && (
          <>
            <Link to="/login" style={{ ...linkStyle, color: "#28a745" }}>Login</Link>
            <Link to="/register" style={{ ...linkStyle, color: "#ffc107" }}>Register</Link>
          </>
        )}

        {user?.role === "employer" && (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/post-job" style={linkStyle}>Post Job</Link>
          </>
        )}

        {user?.role === "jobseeker" && (
          <>
            <Link to="/jobs" style={linkStyle}>Jobs</Link>
            <Link to="/applications" style={linkStyle}>My Applications</Link>
            <Link to="/responses" style={linkStyle}>Responses</Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} style={logoutButton}>Logout</button>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "#000", // 🔲 Black navbar
  color: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 100
};

const linkContainer = {
  display: "flex",
  gap: "20px",
  alignItems: "center"
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff", // White by default
  fontWeight: "500",
  fontSize: "16px"
};

const logoutButton = {
  backgroundColor: "#dc3545", // 🔴 Red
  color: "#fff",
  padding: "8px 14px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Navbar;
