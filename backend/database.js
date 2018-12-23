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

exports.updateQuestionLevel = (score, userId, questionId) =>
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

exports.checkIfVotedAlreadyForAnswer = (userId, answerId) =>
  models.Answer.findOne({
    _id: answerId,
    voters: { $in: [userId] },
  })
    .select('_id')
    .exec()

exports.checkIfVotedAlreadyForQuestion = (userId, questionId) =>
  models.Question.findOne({
    _id: questionId,
    voters: { $in: [userId] },
  })
    .select('_id')
    .exec()

exports.getAllQuestions = (skip, limit, filter, sortRule) =>
  models.Question.find(filter, { voters: 0 }, { score: { $meta: 'textScore' } })
    .sort(sortRule)
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUserQuestions = (skip, limit, filter, sortRule) =>
  models.Question.find(filter, { voters: 0 }, { score: { $meta: 'textScore' } })
    .sort(sortRule)
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUserFavoriteQuestions = (skip, limit, filter, sortRule) =>
  models.Question.find(filter, { voters: 0 }, { score: { $meta: 'textScore' } })
    .sort(sortRule)
    .skip(skip)
    .limit(limit)
    .exec()

exports.getUnsolvedQuestions = (skip, limit, filter, sortRule) =>
  models.Question.find(filter, { voters: 0 }, { score: { $meta: 'textScore' } })
    .sort(sortRule)
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

exports.getAnswers = questionId =>
  models.Answer.find({ questionId }, { voters: 0 }).exec()

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
