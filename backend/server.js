const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// If you're using a database like MongoDB
const mongoose = require("mongoose");

const app = express();
const port = 5000; // You can choose any port

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB (if needed)
mongoose.connect('mongodb+srv://myUser:ZTYMV118L7pDGWMj@cluster0.buoe1.mongodb.net/rideOffer?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Ride offer schema if using MongoDB (optional)
const rideOfferSchema = new mongoose.Schema({
  pickup: String,
  dropoff: String,
  date: Date,
  time: Date,
  passengers: Number,
  price: Number,
  note: String,
  returnRide: Boolean,
});
const RideOffer = mongoose.model("RideOffer", rideOfferSchema);

// API endpoint to handle ride offers
app.post("/api/offer-ride", (req, res) => {
  const { pickup, dropoff, date, time, passengers, price, note, returnRide } = req.body;

  // For now, we'll just log the offer. If using MongoDB, you would save it like this:
  const newRideOffer = new RideOffer({
    pickup,
    dropoff,
    date,
    time,
    passengers,
    price,
    note,
    returnRide,
  });

  console.log("Ride Offer Received:", req.body);

  // Simulate saving the ride offer (if using a database)
  newRideOffer.save()
    .then(() => res.status(200).json({ message: "Ride offer received successfully!" }))
    .catch((error) => res.status(500).json({ message: "Error saving ride offer: " + error.message }));

  // If not using a database, you can just respond with success
  res.status(200).json({ message: "Ride offer received successfully!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
