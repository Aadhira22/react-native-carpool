const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // googleId: { type: String ,unique: false},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  profileImage: { type: String },
  pincode: { type: String },
  isProfileComplete: { type: Boolean, default: false } // Track if profile is completed
});

module.exports = mongoose.model('User', UserSchema);
