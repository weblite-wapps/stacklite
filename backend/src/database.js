const mongoose = require('mongoose')
const { Question } = require('./Model/questionModel')
const { Answer } = require('./Model/answerModel')

exports.connect = function connect(name) {
  mongoose.connect(`mongodb://localhost/${name}`)

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('connected to database successfully ...')
    db.db.dropDatabase()
  })
}

exports.addQuestion = (username, userId, form) =>
  new Question({
    authorName: username,
    authorId: userId,
    title: form.title,
    text: form.text,
    tag: form.tag,
    date: Date.now(),
  }).save()

exports.deleteQuestion = questionId =>
  Question.deleteOne({
    _id: questionId,
  })

exports.getQuestions = (skip, limit, filter, sortRule) =>
  Question.find(filter, { voters: 0, score: { $meta: 'textScore' } })
    .sort(sortRule)
    .skip(skip)
    .limit(limit)
    .exec()

exports.checkIfVotedAlreadyForQuestion = (userId, questionId) =>
  Question.findOne({
    _id: questionId,
    voters: { $in: [userId] },
  })
    .select('_id')
    .exec()

exports.updateQuestionLevel = (score, userId, questionId) =>
  Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $inc: { level: score },
      $push: { voters: userId },
    },
  )

exports.addToFavorite = (questionId, userId) =>
  Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $push: { favorite: userId },
    },
  )

exports.removeFromFavorite = (questionId, userId) =>
  Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $pull: { favorite: userId },
    },
  )

exports.changeAnswersCount = (questionId, change) =>
  Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    {
      $inc: { answersCount: change },
    },
  )

exports.changeSolve = (questionId, bool) =>
  Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    { $set: { solved: bool } },
  )

exports.storeAnswer = (questionId, username, userId, text) =>
  new Answer({
    questionId,
    authorName: username,
    authorId: userId,
    text,
    date: Date.now(),
  }).save()

exports.deleteAnswer = answerId =>
  Answer.deleteOne({
    _id: answerId,
  })

exports.editAnswer = (answerId, editedText) =>
  Answer.findOneAndUpdate(
    {
      _id: answerId,
    },
    {
      $set: { text: editedText },
    },
  )

exports.getAnswers = questionId =>
  Answer.find({ questionId }, { voters: 0 })
    .sort({ level: -1 })
    .exec()

exports.checkIfVotedAlreadyForAnswer = (userId, answerId) =>
  Answer.findOne({
    _id: answerId,
    voters: { $in: [userId] },
  })
    .select('_id')
    .exec()

exports.updateAnswerLevel = (score, userId, answerId) =>
  Answer.findOneAndUpdate(
    {
      _id: answerId,
    },
    {
      $inc: { level: score },
      $push: { voters: userId },
    },
  )

exports.changeChosen = (answerId, bool) =>
  Answer.findOneAndUpdate({ _id: answerId }, { $set: { chosen: bool } })

exports.addReply = (username, userId, answerId, text) =>
  Answer.findOneAndUpdate(
    {
      _id: answerId,
    },
    {
      $push: { replys: { authorName: username, authorId: userId, text } },
    },
  )
