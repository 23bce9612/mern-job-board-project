import React, { useEffect, useState } from "react";
import axios from "axios";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
        setJobs(res.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();

    const applied = JSON.parse(localStorage.getItem(`appliedJobs-${user?.email}`)) || [];
    setAppliedJobs(applied);
  }, [user?.email]);

  const handleApply = (job) => {
    const newApplication = {
      jobId: job._id,
      jobTitle: job.title,
      company: job.company,
      applicantName: user.name,
      userEmail: user.email,
      status: "pending",
    };

    const prev = JSON.parse(localStorage.getItem("pendingApplications")) || [];
    localStorage.setItem("pendingApplications", JSON.stringify([...prev, newApplication]));

    const updatedApplied = [...appliedJobs, job._id];
    setAppliedJobs(updatedApplied);
    localStorage.setItem(`appliedJobs-${user.email}`, JSON.stringify(updatedApplied));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🔍 Available Job Listings
      </h2>

      {jobs.length === 0 ? (
        <p>No jobs available currently.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              background: "#f9f9f9",
            }}
          >
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>

            {appliedJobs.includes(job._id) ? (
              <button disabled style={disabledButtonStyle}>✅ Applied</button>
            ) : (
              <button onClick={() => handleApply(job)} style={applyButtonStyle}>Apply</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const applyButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const disabledButtonStyle = {
  backgroundColor: "gray",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
};

export default JobList;
