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
    level: Number,
    voters: Array,
    answers: Number,
    date: String,
    favorite: Array,
  }),
)

exports.Answer = mongoose.model(
  'Answer',
  new mongoose.Schema({
    questionId: { type: String, index: true },
    authorName: String,
    authorId: String,
    wisId: String,
    text: String,
    level: Number,
    voters: Array,
    date: String,
    replys: Array,
    chosen: Boolean,
  }),
)
