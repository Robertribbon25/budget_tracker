const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // loads .env variables

const transactionRoutes = require('./routes/transactions');

const app = express();

// --- Middleware ---
app.use(cors());                  // allow cross-origin requests from React
app.use(express.json());          // parse incoming JSON bodies

// --- Routes ---
app.use('/api/transactions', transactionRoutes);

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// --- Connect to MongoDB, then start server ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });

MONGO_URI=mongodb://localhost:27017/budgettracker
PORT=5000