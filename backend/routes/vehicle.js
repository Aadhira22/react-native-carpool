const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');


router.post('/vehicles', async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vehicles by userId
router.get('/vehicles/:userId', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.params.userId });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/vehicles/:vehicleId', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.vehicleId);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
});

module.exports = router;
