import React from "react";

function Home() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null; // fallback if parsing fails
  }

  return (
    <div style={{
      textAlign: "center",
      padding: "60px 20px",
      color: "#2c3e50",
      background: "linear-gradient(to right, #f0f2f5, #dff3e3)",
      minHeight: "80vh"
    }}>
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Welcome to <span style={{ color: "#3498db" }}>JOB Board</span>
      </h1>

      {user ? (
        <p style={{ fontSize: "20px" }}>
          Hello, <strong>{user.name}</strong>! 👋<br />
          Explore jobs, post opportunities, and manage applications.
        </p>
      ) : (
        <p style={{ fontSize: "18px" }}>
          Please <strong>Login</strong> or <strong>Register</strong> to get started.<br />
          Our platform helps job seekers and employers connect easily!
        </p>
      )}

      <img
        src="https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-7962.jpg"
        alt="Job Illustration"
        style={{ marginTop: "30px", maxWidth: "400px", width: "100%", borderRadius: "10px" }}
      />
    </div>
  );
}

export default Home;
