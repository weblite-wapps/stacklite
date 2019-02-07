const mongoose = require('mongoose')

exports.User = mongoose.model(
  'User',
  new mongoose.Schema({
    userName: String,
    userId: String,
    score: { type: Number, default: 0 },
    favoriteQuestions: { type: Array, default: [] },
  }),
)
