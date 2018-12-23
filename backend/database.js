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

exports.addQuestion = (username, userId, form, date) =>
  new models.Question({
    authorName: username,
    authorId: userId,
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

exports.updateLevel = (score, userId, questionId) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $inc: { level: score },
      $push: { voters: userId },
    },
  )

exports.changeAnswersNum = (questionId, change) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $inc: { answers: change },
    },
  )

exports.toggleSolve = (questionId, bool) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    { $set: { solved: bool } },
    { overwrite: true },
  )

exports.toggleChosen = (answerId, bool) =>
  models.Answer.findOneAndUpdate(
    { _id: answerId },
    { $set: { chosen: bool } },
    { overwrite: true },
  )

exports.updateAnswerLevel = (score, userId, answerId) =>
  models.Answer.findOneAndUpdate(
    {
      _id: answerId,
    },
    {
      $inc: { level: score },
      $push: { voters: userId },
    },
  )

exports.getAllQuestions = (skip, limit) =>
  models.Question.find({})
    .sort({ level: -1 })
    .skip(skip)
    .limit(limit)
    .exec()

exports.getAllQuestionsSearch = (searchQuery, skip, limit) =>
  models.Question.find(
    { $text: { $search: searchQuery } },
    { score: { $meta: 'textScore' } },
  )
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUserQuestions = (skip, limit, userId) =>
  models.Question.find({ authorId: userId })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUserQuestionsSearch = (searchQuery, skip, limit, userId) =>
  models.Question.find(
    { authorId: userId, $text: { $search: searchQuery } },
    { score: { $meta: 'textScore' } },
  )
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUserFavoriteQuestions = (skip, limit, userId) =>
  models.Question.find({ favorite: { $all: [userId] } })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUserFavoriteQuestionsSearch = (searchQuery, skip, limit, userId) =>
  models.Question.find(
    { favorite: { $all: [userId] }, $text: { $search: searchQuery } },
    { score: { $meta: 'textScore' } },
  )
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUnsolvedQuestions = (skip, limit) =>
  models.Question.find({
    solved: false,
  })
    .sort({ level: -1 })
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUnsolvedQuestionsSearch = (searchQuery, skip, limit) =>
  models.Question.find(
    { solved: false, $text: { $search: searchQuery } },
    { score: { $meta: 'textScore' } },
  )
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .exec()

exports.addToFavorite = (questionId, userId) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $push: { favorite: userId },
    },
  )

exports.removeFromFavorite = (questionId, userId) =>
  models.Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $pull: { favorite: userId },
    },
  )

exports.deleteQuestion = questionId =>
  models.Question.deleteOne({
    _id: questionId,
  })

exports.deleteAnswer = answerId =>
  models.Answer.deleteOne({
    _id: answerId,
  })

exports.editAnswer = (answerId, editedText) =>
  models.Answer.findOneAndUpdate(
    {
      _id: answerId,
    },
    {
      $set: { text: editedText },
    },
    { overwrite: true },
  )

exports.getAnswers = questionId => models.Answer.find({ questionId }).exec()

exports.storeAnswer = (questionId, username, userId, text, date) =>
  new models.Answer({
    questionId,
    authorName: username,
    authorId: userId,
    text,
    level: 0,
    voters: [],
    date,
    replys: [],
    chosen: false,
  }).save()

exports.addReply = (username, userId, answerId, text) =>
  models.Answer.findOneAndUpdate(
    {
      _id: answerId,
    },
    {
      $push: { replys: { authorName: username, authorId: userId, text } },
    },
  )
