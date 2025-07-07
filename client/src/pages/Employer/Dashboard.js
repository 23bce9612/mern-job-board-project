import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");

      // ✅ Match jobs where postedBy.name == logged-in employer name
      const postedByMe = res.data.filter(
        job => job.postedBy?.name === user?.name
      );

      setJobs(postedByMe);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Job deleted");
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete job.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ color: "#007bff", textAlign: "center" }}>
        👋 Welcome, {user?.name}
      </h2>

      <h3 style={{ marginTop: "20px" }}>📄 Jobs You've Posted</h3>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            background: "#f9f9f9"
          }}>
            <h4>{job.title} at {job.company}</h4>
            <p><strong>Location:</strong> {job.location}</p>
            <p>{job.description}</p>
            <button onClick={() => deleteJob(job._id)} style={{
              background: "#dc3545",
              color: "#fff",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
