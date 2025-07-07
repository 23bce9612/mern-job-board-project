import React, { useEffect, useState } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const postedJobs = JSON.parse(localStorage.getItem("employerJobs")) || [];
    const allApps = JSON.parse(localStorage.getItem("pendingApplications")) || [];

    const postedJobIds = postedJobs.map((job) => job._id);
    const filtered = allApps.filter((app) => postedJobIds.includes(app.jobId));

    setApplications(filtered);
  }, []);

  const handleDecision = (index, status) => {
    const updated = [...applications];
    updated[index].status = status;
    updated[index].responseMessage =
      status === "accepted"
        ? `🎉 Congratulations! You've been selected for the role of ${updated[index].jobTitle} at ${updated[index].company}.`
        : `❌ Thank you for applying to ${updated[index].jobTitle} at ${updated[index].company}. Unfortunately, you were not selected.`;

    const allApps = JSON.parse(localStorage.getItem("pendingApplications")) || [];

    const newAll = allApps.map((app) =>
      app.jobId === updated[index].jobId && app.userEmail === updated[index].userEmail
        ? updated[index]
        : app
    );

    localStorage.setItem("pendingApplications", JSON.stringify(newAll));
    setApplications(
      newAll.filter((app) =>
        JSON.parse(localStorage.getItem("employerJobs")).map((job) => job._id).includes(app.jobId)
      )
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        📨 Job Applications (Employer View)
      </h2>

      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        applications.map((app, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              background: "#f9f9f9",
            }}
          >
            <h4>{app.applicantName} applied for <strong>{app.jobTitle}</strong></h4>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    app.status === "accepted"
                      ? "green"
                      : app.status === "rejected"
                      ? "red"
                      : "orange",
                }}
              >
                {app.status}
              </span>
            </p>

            {app.status === "pending" ? (
              <div>
                <button
                  onClick={() => handleDecision(index, "accepted")}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "8px 16px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(index, "rejected")}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            ) : (
              <div style={{ marginTop: "10px" }}>
                <strong>📩 Response:</strong>
                <p>{app.responseMessage}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Applications;
