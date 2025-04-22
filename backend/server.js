const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chatRoutes');
const groupRoutes = require('./routes/groupRoutes');
const profileRoutes = require('./routes/profile');
const vehicleRoutes = require('./routes/vehicle');
const rideRoutes = require('./routes/rides');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', vehicleRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/group', groupRoutes);

// Socket.IO for real-time messaging
io.on('connection', (socket) => {
  console.log('📲 New client connected');

  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg); // broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('👋 Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(🚀 Server running on port ${PORT}));
