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

exports.addQuestion = (username, userId, wisId, form, date) =>
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
    date,
    favorite: [],
    solved: false,
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

exports.updateLevelAgain = (score, userId, wisId, questionId) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
      wisId,
    },
    {
      $inc: { 'voters.$[elem].vote': score, level: score },
    },
    {
      arrayFilters: [{ 'elem.userId': { $eq: userId } }],
    },
  )

exports.changeAnswersNum = (wisId, questionId, change) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
      wisId,
    },
    {
      $inc: { answers: change },
    },
  )

exports.changeSolve = (wisId, questionId, bool) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
      wisId,
    },
    { $set: { solved: bool } },
    { overwrite: true },
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

exports.getAllQuestions = wisId =>
  models.Question.find({ wisId })
    .sort({ level: 1 })
    .exec()

exports.getUserFavoriteQuestions = (userId, wisId) =>
  models.Question.find({ favorite: { $all: [userId] }, wisId }).exec()

exports.getUnsolvedQuestions = wisId =>
  models.Question.find({
    solved: false,
    wisId,
  })
    .sort({ level: 1 })
    .exec()

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

exports.deleteQuestion = (questionId, wisId) =>
  models.Question.deleteOne({
    _id: questionId,
    wisId,
  })

exports.deleteAnswer = (answerId, wisId) =>
  models.Answer.deleteOne({
    _id: answerId,
    wisId,
  })

exports.editAnswer = (answerId, editedText, wisId) =>
  models.Answer.findOneAndUpdate(
    {
      _id: answerId,
      wisId,
    },
    {
      $set: { text: editedText },
    },
    { overwrite: true },
  )

exports.getAnswers = (questionId, wisId) =>
  models.Answer.find({ questionId, wisId }).exec()

exports.storeAnswer = (questionId, username, userId, wisId, text, date) =>
  new models.Answer({
    questionId,
    authorName: username,
    authorId: userId,
    wisId,
    text,
    level: 0,
    voters: [],
    date,
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
