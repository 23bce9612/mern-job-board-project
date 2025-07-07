import React from "react";

function EmployerHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2 style={{ fontSize: "28px", color: "#007bff" }}>
        👋 Welcome, {user?.name || "Employer"}!
      </h2>

      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        You're now on the <strong>Employer Dashboard</strong> of Job Board.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f1f5ff",
          borderRadius: "10px",
          border: "1px solid #cce",
        }}
      >
        <h3>📌 Next Steps</h3>
        <ul style={{ lineHeight: "1.8", paddingLeft: "20px" }}>
          <li>👉 Post a new job from the <strong>Post Job</strong> menu</li>
          <li>📨 View job applications in <strong>Dashboard</strong></li>
          <li>✅ Accept or reject applicants</li>
        </ul>
      </div>
    </div>
  );
}

export default EmployerHome;
