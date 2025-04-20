const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const http = require('http');
const socketIo = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');
const groupRoutes = require('./routes/groupRoutes');
const profileRoutes = require('./routes/profile');
const vehicleRoutes= require('./routes/vehicle');
// If you're using a database like MongoDB
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' ,methods: ["GET", "POST"]} });

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors()); // Enable Cross-Origin Resource Sharing


// Connect to MongoDB (if needed)
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

  app.use('/api', authRoutes);
  app.use('/api', profileRoutes);
  app.use('/api',vehicleRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/group', groupRoutes);
  io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('sendMessage', (msg) => {
      io.emit('receiveMessage', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  const PORT =process.env.PORT;
  // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

