const mongoose = require('mongoose')

exports.Question = mongoose.model(
  'Question',
  new mongoose.Schema({
    authorName: String,
    authorId: String,
    wisId: String,
    title: String,
    text: String,
    tag: String,
    upLevel: Array,
    downLevel: Array,
    answers: Number,
    date: String,
  }),
)
