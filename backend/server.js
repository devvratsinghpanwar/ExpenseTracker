const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Connect to database only if not already connected
if (process.env.NODE_ENV !== 'production' || !global.mongooseConnection) {
  connectDB();
  global.mongooseConnection = true;
}

// Middleware
// CORS Configuration
const corsOptions = {
  origin: [
      'http://localhost:5173', // Your local React dev server
      'http://localhost:3000', // Common alternative for local dev
      'https://expensemanager-teal.vercel.app/' // **IMPORTANT: Add your Vercel URL here later**
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// API Routes - wrap in try-catch for better error handling
try {
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/expenses', require('./routes/expenseRoutes'));
  app.use('/api', require('./routes/testRoutes'));
} catch (error) {
  console.error('Error loading routes:', error);
}

// Serve built frontend
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

// Catch-all handler
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

// For Vercel, export the app
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
