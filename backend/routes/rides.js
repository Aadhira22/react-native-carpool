const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// POST /api/rides
router.post('/', async (req, res) => {
  try {
    const { pickup, dropoff, route, date, time, passengers } = req.body;

    const ride = new Ride({
      pickup,
      dropoff,
      route,
      date,
      time,
      passengers,
    });

    const savedRide = await ride.save();
    res.status(201).json(savedRide);
  } catch (err) {
    console.error('Error publishing ride:', err);
    res.status(500).json({ error: 'Failed to publish ride' });
  }
});

// GET /api/rides (optional: to fetch rides)
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rides' });
  }
});

module.exports = router;
