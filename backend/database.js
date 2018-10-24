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
    date: '',
  }).save()

exports.updateLevel = (score, userId, questionId) =>
  models.Question.findByIdAndUpdate(questionId, {
    $inc: { level: score },
    $push: { voters: userId },
  })

exports.getUserAnswer = (userId, wisId) =>
  models.Question.findOne({ userId, wisId })
    .exec()
    .then(res => {
      if (!res) return { found: false, answers: [] }
      return { found: true, answers: res.answers }
    })

exports.getAllQuestions = wisId => models.Question.find({ wisId }).exec()
