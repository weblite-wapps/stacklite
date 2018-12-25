// TODO: Use file for each model
const mongoose = require('mongoose')

// UserSchema

const questionSchema = new mongoose.Schema({
  authorName: String,
  authorId: String,
  title: String,
  text: String,
  tag: String,
  level: Number,
  voters: Array,
  answers: Number, // TODO: answersCount
  date: Number,
  favorite: Array,
  solved: Boolean,
})

questionSchema.index(
  { authorName: 'text', title: 'text', text: 'text', tag: 'text' },
  {
    name: 'Question Schema Index',
    weights: { authorName: 10, tag: 8, title: 5, text: 1 },
  },
)

exports.Question = mongoose.model('Question', questionSchema)

exports.Answer = mongoose.model(
  'Answer',
  new mongoose.Schema({
    questionId: { type: String, index: true },
    authorName: String,
    authorId: String,
    text: String,
    level: Number,
    voters: Array,
    date: Number,
    replys: Array,
    chosen: Boolean,
  }),
)
