import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

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
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      const { token, user } = res.data;

      localStorage.setItem("user", JSON.stringify({ ...user, token }));

      if (user.role === "jobseeker") {
        const profile = localStorage.getItem(`jobseekerProfile-${user.email}`);
        navigate(profile ? "/jobs" : "/jobs"); // you may adjust this
      } else if (user.role === "employer") {
        navigate("/home-employer"); // ✅ FIXED ROUTE
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f8ff" }}>
      <div style={{ maxWidth: "400px", width: "100%", background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}>Welcome to Job Board</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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

          <button type="submit" style={buttonStyle}>
            Login
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {error}
            </p>
          )}
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#007bff", fontWeight: "bold", textDecoration: "underline" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

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

export default Login;
