const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'User routes working' });
});

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
