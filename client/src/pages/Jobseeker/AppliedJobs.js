import React, { useEffect, useState } from "react";

function AppliedJobs() {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    setUser(storedUser);

    const jobs = JSON.parse(localStorage.getItem(`appliedJobs-${storedUser.email}`)) || [];
    setAppliedJobs(jobs);
  }, []);

  if (!user) {
    return (
      <p style={{ padding: "30px", textAlign: "center", color: "red" }}>
        ❌ You must be logged in to view applications.
      </p>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>📦 My Applications</h2>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        appliedJobs.map((job, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              background: "#f0fff0"
            }}
          >
            <strong>{job.title}</strong> at {job.company}<br />
            <em>{job.location}</em><br />
            <span style={{ color: "green", fontWeight: "bold" }}>✅ Applied</span>
          </div>
        ))
      )}
    </div>
  );
}

export default AppliedJobs;
