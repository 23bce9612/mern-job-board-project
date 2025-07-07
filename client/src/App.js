import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "./pages/login";
import Register from "./pages/register";

// Jobseeker Pages
import JobList from "./pages/Public/JobList";
import AppliedJobs from "./pages/Jobseeker/AppliedJobs";
import Responses from "./pages/Jobseeker/Responses";

// Employer Pages
import Dashboard from "./pages/Employer/Dashboard";
import PostJob from "./pages/Employer/PostJob";
import EmployerHome from "./pages/Employer/EmployerHome";

// General Home Page
import Home from "./pages/Home"; // ✅ ADDED

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* General */}
        <Route path="/home" element={<Home />} /> {/* ✅ ADDED */}

        {/* Jobseeker Pages */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/applications" element={<AppliedJobs />} />
        <Route path="/responses" element={<Responses />} />

        {/* Employer Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/home-employer" element={<EmployerHome />} />
      </Routes>
    </Router>
  );
}

export default App;
