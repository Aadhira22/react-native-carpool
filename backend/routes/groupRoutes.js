const mongoose=require('mongoose');
const express = require('express');
const multer = require('multer');
const Group = require('../models/Group');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // unique file name
  },
});

const upload = multer({ storage });

// Create a group
// Middleware to mock authentication (from headers)
const getUserFromHeader = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 't=>fhfdu'); // replace with your real secret
    const user = await User.findById(decoded.userId); // or decoded.id depending on how you sign it

    if (!user) return res.status(404).json({ error: 'User not found' });

    req.user = user; // or { _id: user._id } if you want just ID
    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};



router.post('/create', getUserFromHeader, upload.single('image'), async (req, res) => {
  try {
    const { name, memberIds } = req.body;
    const createdBy = req.user._id;

    const group = new Group({
      name,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
      members: JSON.parse(memberIds),
      createdBy,
    });

    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get groups for user (createdBy or member)
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const groups = await Group.find({
      $or: [
        { members: userId },
        { createdBy: userId }
      ]
    }).populate('members', 'username fullName profileImage');

    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a group (only if creator)
router.delete('/:groupId', getUserFromHeader, async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: req.user._id } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json({ message: 'You have left the group', group });
  } catch (err) {
    console.error('Error removing user from group:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// router.delete('/:groupId', getUserFromHeader, async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const deleted = await Group.findOneAndDelete({
//       _id: groupId,
//       createdBy: req.user._id
//     });

//     if (!deleted) return res.status(403).json({ error: 'Unauthorized or not found' });
//     res.json({ message: 'Group deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }); 

// Add a member (only by creator)
router.post('/:groupId/add-member', getUserFromHeader, async (req, res) => {
  try {
    const { userId } = req.body;
    const { groupId } = req.params;

    // Check if current user is the creator
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    if (String(group.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ error: 'Only the creator can add members' });
    }

    // Add user to members array if not already in
    group.members.addToSet(userId);
    await group.save();

    const updatedGroup = await Group.findById(groupId)
      .populate('members', 'username fullName profileImage');
    
    res.json(updatedGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
