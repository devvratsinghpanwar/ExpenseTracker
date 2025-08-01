const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin:['https://expense-tracker-rdue.vercel.app/', 'https://expense-tracker-rdue.vercel.app//api/*','http://localhost:5000', 'http://localhost:4173', 'http://localhost:5173', 'http://localhost:3000','https://expense-tracker-rdue.vercel.app/', 'https://expense-tracker-rdue.vercel.app/api/*'],
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: '*',
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'API is running',
    dbConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Start server after DB connects
const startServer = async () => {
  try {
    await connectDB(); // Connect ONCE here
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
