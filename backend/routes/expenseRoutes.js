const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Expense routes working' });
});

// Protected routes
router.get('/', protect, getExpenses);
router.post('/', protect, addExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;
