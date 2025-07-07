const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: {
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST /api/users/login
// @desc    Login user and return token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id, 
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
