const express = require('express');
const User = require('../models/User'); // Adjust the path based on your project structure
const Message = require('../models/Message');
const router = express.Router();

router.get('/messages/:chatType/:id', async (req, res) => {
    const { chatType, id } = req.params;
    const messages = await Message.find({ chatType, receiver: id })
      .populate('sender', 'username fullName profileImage') // show minimal user data
      .sort({ createdAt: 1 });
    res.json(messages);
  });
  

  router.post('/send', async (req, res) => {
    try {
      const { text, sender, receiver, chatType } = req.body;
  
      const user = await User.findById(sender);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const newMessage = new Message({
        text,
        sender,
        senderName: user.username, // add sender's name to the message
        receiver,
        chatType,
      });
  
      const savedMessage = await newMessage.save();
      res.json(savedMessage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

module.exports = router;
