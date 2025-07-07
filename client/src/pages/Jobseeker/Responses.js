import React, { useEffect, useState } from "react";

function Responses() {
  const [applications, setApplications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;

    const all = JSON.parse(localStorage.getItem("pendingApplications")) || [];
    const mine = all.filter(app => app.userEmail === user.email);
    setApplications(mine);
  }, [user]);

  if (!user) {
    return <p style={{ textAlign: "center", color: "red" }}>❌ You must be logged in to view responses.</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>📨 Application Responses</h2>
      {applications.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        applications.map((app, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            backgroundColor: "#fff"
          }}>
            <h4>{app.jobTitle} at {app.company}</h4>
            <p>Status: <strong>{app.status}</strong></p>
            {app.responseMessage && (
              <p><strong>Message:</strong> {app.responseMessage}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Responses;
