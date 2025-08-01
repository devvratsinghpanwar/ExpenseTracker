const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Connect to Database once when the function boots up
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: '*',
  credentials: false // Set to false when using origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('backend is online');
});
app.get('/devvrat', (req, res) => {
  res.send('brother this route is working also');
});

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// --- Health & DB Check ---
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        message: 'API is running',
        dbConnected: mongoose.connection.readyState === 1 // 1 means connected
    });
});

// --- Vercel Export ---
// This is the only thing that needs to be exported for Vercel
module.exports = app;