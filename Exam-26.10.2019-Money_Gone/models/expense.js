const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    report: {
        type: Boolean,
        default: false
    },
    user: {
        type: String
    }
});

module.exports = mongoose.model('Expense', expenseSchema);