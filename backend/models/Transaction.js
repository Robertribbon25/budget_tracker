// backend/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['income', 'expense'], // only these two values allowed
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, 'Amount must be positive'], // built-in validation
    },
    description: {
      type: String,
      required: true,
      trim: true,         // removes accidental whitespace
      maxlength: 100,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // Link to user when you add auth:
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model('Transaction', transactionSchema);