const express = require('express');
const User = require('../models/User');
const { use } = require('react');
const jwt = require("jsonwebtoken");
const router = express.Router();


router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "t=>fhfdu");
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post('/complete-profile', async (req, res) => {
    const { userId, fullName, phoneNumber, gender, profileImage, pincode ,dob} = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  
      // Update user profile
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;
      user.gender = gender;
      user.profileImage = profileImage;
      user.pincode = pincode;
      user.isProfileComplete = true;
      user.dob=dob;
  
      await user.save();
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  router.post('/updateUser', async (req, res) => {
    const updatedUser = req.body;
  
    if (!updatedUser.email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
  
    try {
      const user = await User.findOneAndUpdate(
        { email: updatedUser.email },       // Find by email
        { $set: updatedUser },              // Update fields
        { new: true, runValidators: true }  // Return updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.json({ message: 'User updated successfully.', user });
    } catch (err) {
      console.error('❌ Update error:', err.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

  module.exports = router;
  