const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
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
  solved: Boolean,
})

questionSchema.index(
  { authorName: 'text', title: 'text', text: 'text', tag: 'text' },
  {
    name: 'Question Schema Index',
    weights: { authorName: 10, title: 5, text: 1, tag: 8 },
  },
)

exports.Question = mongoose.model('Question', questionSchema)

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
