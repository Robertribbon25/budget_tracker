// backend/models/User.js  (for the auth feature later)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // store hashed, never plain text
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);