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

exports.toggleChosen = (answerId, wisId, bool) =>
  models.Answer.findOneAndUpdate(
    { wisId, _id: answerId },
    { $set: { chosen: bool } },
    { overwrite: true },
  )

exports.updateAnswerLevel = (score, userId, wisId, answerId) =>
  models.Answer.findOneAndUpdate(
    {
      _id: answerId,
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

exports.getAnswers = (questionId, wisId) =>
  models.Answer.find({ questionId, wisId }).exec()

exports.storeAnswer = (questionId, username, userId, wisId, text) =>
  new models.Answer({
    questionId,
    authorName: username,
    authorId: userId,
    wisId,
    text,
    level: 0,
    voters: [],
    date: new Date(),
    replys: [],
    chosen: false,
  }).save()

exports.addReply = (username, userId, wisId, answerId, text) =>
  models.Answer.findOneAndUpdate(
    {
      _id: answerId,
      wisId,
    },
    {
      $push: { replys: { authorName: username, authorId: userId, text } },
    },
  )
