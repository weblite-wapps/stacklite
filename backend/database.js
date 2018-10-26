const mongoose = require('mongoose')
const models = require('./db_models')

exports.connect = function connect(name) {
  mongoose.connect(`mongodb://localhost/${name}`)

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('connected to database successfully ...')
    db.db.dropDatabase()
  })
}

exports.addQuestion = (username, userId, wisId, form) =>
  new models.Question({
    authorName: username,
    authorId: userId,
    wisId,
    title: form.title,
    text: form.text,
    tag: form.tag,
    level: 0,
    voters: [],
    answers: 0,
    date: new Date(),
    favorite: [],
  }).save()

exports.updateLevel = (score, userId, wisId, questionId) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
      wisId,
    },
    {
      $inc: { level: score },
      $push: { voters: userId },
    },
  )

exports.getUserQuestions = (userId, wisId) =>
  models.Question.find({ authorId: userId, wisId }).exec()

exports.getAllQuestions = wisId => models.Question.find({ wisId }).exec()

exports.addToFavorite = (questionId, userId, wisId) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
      wisId,
    },
    {
      $push: { favorite: userId },
    },
  )

exports.removeFromFavorite = (questionId, userId, wisId) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
      wisId,
    },
    {
      $pull: { favorite: userId },
    },
  )

exports.getUserFavoriteQuestions = (userId, wisId) =>
  models.Question.find({ favorite: { $all: [userId] }, wisId }).exec()

// exports.addToFavorite = (userId, wisId, questionId) =>
//   models.Favorite.findOneAndUpdate(
//     {
//       userId,
//       wisId,
//     },
//     {
//       $push: { questions: questionId },
//     },
//   )

// exports.createNewFavorite = (userId, wisId) =>
//   new models.Favorite({
//     userId,
//     wisId,
//     questions: [],
//   }).save()

// exports.handleAddToFavoriteRequest = (userId, wisId, questionId) =>
//   models.Favorite.findOne({ userId, wisId })
//     .exec()
//     .then(res => {
//       if (!res) this.createNewFavorite(userId, wisId)
//       this.addToFavorite(userId, wisId, questionId)
//     })

// exports.getFavorites = (userId, wisId) =>
//   models.Favorite.find({ userId, wisId }).exec()
