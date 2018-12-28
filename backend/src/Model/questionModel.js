const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  authorName: String,
  authorId: String,
  title: String,
  text: String,
  tag: String,
  level: { type: Number, default: 0 },
  voters: { type: Array, default: [] },
  answersCount: { type: Number, default: 0 },
  date: Number,
  favorite: { type: Array, default: [] },
  solved: { type: Boolean, default: false },
})

questionSchema.index(
  { authorName: 'text', title: 'text', text: 'text', tag: 'text' },
  {
    name: 'Question Schema Index',
    weights: { authorName: 10, tag: 8, title: 5, text: 1 },
  },
)

exports.Question = mongoose.model('Question', questionSchema)
