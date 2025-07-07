const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes"); // ✅ user routes
const jobRoutes = require("./routes/jobRoutes");   // ✅ job routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);   // Register/Login
app.use("/api/jobs", jobRoutes);     // Job APIs

// Health check
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// MongoDB & Server Setup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
