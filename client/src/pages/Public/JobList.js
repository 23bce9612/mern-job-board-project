import React, { useEffect, useState } from "react";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Jobseeker";

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      alert("❌ Unable to fetch jobs.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = (job) => {
    const appliedJobs = JSON.parse(localStorage.getItem(`appliedJobs-${user.email}`)) || [];
    const alreadyApplied = appliedJobs.find(j => j._id === job._id);

    if (alreadyApplied) {
      alert("✅ You already applied for this job.");
    } else {
      appliedJobs.push(job);
      localStorage.setItem(`appliedJobs-${user.email}`, JSON.stringify(appliedJobs));
      alert(`🎉 You applied for ${job.title}`);
      fetchJobs(); // to update button text
    }
  };

  const isApplied = (jobId) => {
    const appliedJobs = JSON.parse(localStorage.getItem(`appliedJobs-${user.email}`)) || [];
    return appliedJobs.some(j => j._id === jobId);
  };

  return (
    <div style={{ padding: "30px", background: "#f4f9ff", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#007bff", marginBottom: "30px" }}>
        👋 Welcome, <span style={{ color: "#333" }}>{name}</span>! <br />
        <span style={{ fontSize: "18px", color: "#666" }}>Explore Available Jobs Below</span>
      </h2>

      {jobs.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No jobs available right now.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {jobs.map(job => (
            <div key={job._id} style={cardStyle}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p style={{ fontStyle: "italic" }}>{job.description}</p>

              {user?.role === "jobseeker" && (
                <button
                  style={{
                    marginTop: "10px",
                    background: isApplied(job._id) ? "gray" : "#28a745",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: isApplied(job._id) ? "not-allowed" : "pointer"
                  }}
                  disabled={isApplied(job._id)}
                  onClick={() => handleApply(job)}
                >
                  {isApplied(job._id) ? "Applied" : "Apply"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
};

export default JobList;
