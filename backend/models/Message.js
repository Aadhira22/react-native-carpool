const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderName: { type: String, required: true },
  chatType: { type: String, enum: ['individual', 'group'], required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be a group ID or user ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
