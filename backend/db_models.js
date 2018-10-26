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

// exports.Favorite = mongoose.model(
//   'Favorite',
//   new mongoose.Schema({
//     userId: String,
//     wisId: String,
//     questions: Array,
//   }),
// )
