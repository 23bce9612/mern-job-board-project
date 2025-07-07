import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, form);
      const { token, user } = res.data;

      localStorage.setItem("user", JSON.stringify({ ...user, token }));

      if (user.role === "jobseeker") {
        navigate("/jobs");
      } else if (user.role === "employer") {
        navigate("/home-employer");
      } else {
        setError("Unknown user role.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Welcome to Job Board</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>Login</button>

          {error && <p style={errorStyle}>{error}</p>}
        </form>

        <p style={footerStyle}>
          Don’t have an account?{" "}
          <Link to="/register" style={linkStyle}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

// 🔧 Styles
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f0f8ff"
};

const cardStyle = {
  maxWidth: "400px",
  width: "100%",
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#007bff"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px"
};

const buttonStyle = {
  background: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
  textAlign: "center"
};

const footerStyle = {
  textAlign: "center",
  marginTop: "20px"
};

const linkStyle = {
  color: "#007bff",
  fontWeight: "bold",
  textDecoration: "underline"
};

export default Login;
