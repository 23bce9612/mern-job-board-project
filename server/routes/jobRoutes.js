const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   POST /api/jobs
// @desc    Create a new job (employer only)
// @access  Private
router.post("/", auth, async (req, res) => {
  const { title, company, location, description } = req.body;

  if (req.user.role !== "employer") {
    return res.status(403).json({ msg: "Only employers can post jobs" });
  }

  try {
    const newJob = new Job({
      title,
      company,
      location,
      description,
      postedBy: req.user.id,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("POST job error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET /api/jobs
// @desc    Get all jobs (public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email role");
    res.json(jobs);
  } catch (err) {
    console.error("GET jobs error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job (employer only)
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("🔐 User:", req.user);

    const job = await Job.findById(req.params.id);

    if (!job) {
      console.log("❌ Job not found");
      return res.status(404).json({ msg: "Job not found" });
    }

    console.log("🧾 Job found:", job);

    if (job.postedBy.toString() !== req.user.id) {
      console.log("🚫 Not authorized to delete:", job.postedBy.toString(), req.user.id);
      return res.status(403).json({ msg: "Not authorized to delete this job" });
    }

    await job.deleteOne(); // ✅ use deleteOne instead of remove
    console.log("✅ Job deleted");

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    console.error("🔥 DELETE job error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
