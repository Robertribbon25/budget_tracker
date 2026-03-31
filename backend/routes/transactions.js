// backend/routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// ─── POST /api/transactions ─────────────────────────────────────
// Creates a new income or expense transaction
router.post('/', async (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body;

    // Manual validation (you can also use express-validator)
    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'type must be income or expense' });
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'amount must be a positive number' });
    }
    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: 'description is required' });
    }

    const transaction = new Transaction({ type, amount, description, category, date });
    const saved = await transaction.save();

    res.status(201).json(saved); // 201 = "Created"
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ─── GET /api/transactions ───────────────────────────────────────
// Returns all transactions, newest first
// Supports optional filters: ?type=income  ?category=Food
router.get('/', async (req, res) => {
  try {
    const filter = {};

    // Apply optional query-string filters
    if (req.query.type)     filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;

    // Date range filter: ?from=2024-01-01&to=2024-12-31
    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) filter.date.$gte = new Date(req.query.from);
      if (req.query.to)   filter.date.$lte = new Date(req.query.to);
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── DELETE /api/transactions/:id ───────────────────────────────
// Deletes a single transaction by its MongoDB _id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Deleted successfully', id: req.params.id });
  } catch (err) {
    // If the id format is invalid, Mongoose throws a CastError
    res.status(400).json({ message: 'Invalid transaction ID' });
  }
});

// ─── GET /api/transactions/summary ──────────────────────────────
// Returns total income, total expenses, and balance
router.get('/summary', async (req, res) => {
  try {
    // MongoDB aggregation: group by type and sum amounts
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: '$type',              // group by "income" or "expense"
          total: { $sum: '$amount' } // sum the amounts in each group
        }
      }
    ]);

    // Transform array into a readable object
    const summary = { income: 0, expenses: 0, balance: 0 };

    result.forEach(item => {
      if (item._id === 'income')  summary.income   = item.total;
      if (item._id === 'expense') summary.expenses = item.total;
    });

    summary.balance = summary.income - summary.expenses;

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;