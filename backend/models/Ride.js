const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  pickup: {
    lat: Number,
    lng: Number,
    description: String,
  },
  dropoff: {
    lat: Number,
    lng: Number,
    description: String,
  },
  route: {
    duration: String,
    summary: String,
    coordinates: [
      {
        latitude: Number,
        longitude: Number,
      },
    ],
  },
  date: Date,
  time: String,
  passengers: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ride', rideSchema);
