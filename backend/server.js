const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
// Use a simple CORS setup. Vercel handles the environment differences.
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// --- API Routes ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// --- Health & DB Check ---
// This helps verify that the API is up and the DB is connected.
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        message: 'API is running',
        dbConnected: mongoose.connection.readyState === 1 // 1 means connected
    });
});

// --- Vercel Export ---
// This is the only thing that should be exported.
module.exports = app;
