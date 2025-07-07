import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("❌ Token not found. Please login again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/jobs",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to post job.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}>
        📝 Post a New Job
      </h2>

      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <label>Job Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />

        <label>Company:</label>
        <input type="text" name="company" value={form.company} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={form.location} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="4" required></textarea>

        <button type="submit" style={{
          background: "#007bff", color: "#fff", padding: "10px", border: "none",
          borderRadius: "5px", cursor: "pointer", fontWeight: "bold"
        }}>
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;
