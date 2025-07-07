import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, form);
      alert("✅ Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}>
          Register on Job Board
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

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

          <div>
            <label>Role:</label>
            <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <button type="submit" style={buttonStyle}>
            Register
          </button>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", fontWeight: "bold", textDecoration: "underline" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// 🔧 CSS styles
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f0f8ff"
};

const cardStyle = {
  maxWidth: "450px",
  width: "100%",
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px"
};

const buttonStyle = {
  background: "#28a745",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Register;
