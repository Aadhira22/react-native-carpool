const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  plate: { type: String, required: true },
  images: [{ type: String }], // array of image URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
