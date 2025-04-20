const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const admin = require('firebase-admin');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

// Firebase Initialization (move outside route)
const serviceAccount = require(path.resolve(__dirname, process.env.FIREBASE_ADMIN_KEY_PATH));
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Signup Endpoint
// Signup Endpoint
router.post('/signup', async (req, res) => {
  const { username, email, password, googleId } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "Username, email, and password are required" });
  }

  console.log("REQ BODY:", req.body);

  try {
    // Prepare user data without googleId if it's not provided
    const userData = { username, email, password };

    if (googleId) {
      userData.googleId = googleId; // Add googleId only if it's provided
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hash the password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });

    await newUser.save();
    res.json({ success: true, userId: newUser._id });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Google Login Route
router.post("/checkUser", async (req, res) => {
  const { email, name } = req.body;  // Ensure 'name' is sent in the body

  if (!email) return res.status(400).json({ message: "Google ID required" });

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,  // Save name if user is new
        createdAt: new Date(),
      });
      await user.save();
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_GOOGLE, { expiresIn: "7d" });
    res.json({ message: "User exists", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { email: user.email, username: user.username, id: user._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
