const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'],
        default: 'Other'
    },
    date: {
        type: String,
        required: true,
        default: () => new Date().toISOString().split('T')[0]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Expense', expenseSchema);
