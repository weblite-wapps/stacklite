const mongoose = require('mongoose')

exports.Answer = mongoose.model(
  'Answer',
  new mongoose.Schema({
    questionId: { type: String, index: true },
    authorName: String,
    authorId: String,
    text: String,
    level: { type: Number, default: 0 },
    voters: { type: Array, default: [] },
    date: Number,
    replys: { type: Array, default: [] },
    chosen: { type: Boolean, default: false },
  }),
)
