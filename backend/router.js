const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')

const router = express.Router()
router.use(bodyParser.json())

const getFormattedDate = () => {
  const newDate = new Date()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const showMonth = month < 10 ? `0${month}` : month
  const showDay = day < 10 ? `0${day}` : day
  return `${newDate.getFullYear()}/${showMonth}/${showDay}|${newDate.getUTCHours()}/${newDate.getUTCMinutes()}/${newDate.getUTCSeconds()}`
}

router.post('/postQuestion', ({ body: { username, userId, form } }, res) =>
  database
    .addQuestion(username, userId, form, getFormattedDate())
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/changeAnswersNum', ({ body: { questionId, change } }, res) =>
  database
    .changeAnswersNum(questionId, change)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/changeSolve', ({ body: { questionId, bool } }, res) =>
  database
    .toggleSolve(questionId, bool)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/toggleChosen', ({ body: { answerId, bool } }, res) =>
  database
    .toggleChosen(answerId, bool)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post(
  '/storeAnswer',
  ({ body: { questionId, username, userId, text } }, res) =>
    database
      .storeAnswer(questionId, username, userId, text, getFormattedDate())
      .then(() => res.send('submitted'))
      .catch(err => res.status(500).send(err)),
)

router.post(
  '/addReply',
  ({ body, body: { username, userId, answerId, text } }, res) =>
    database
      .addReply(username, userId, answerId, text)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

router.post(
  '/updateLevel',
  ({ body, body: { score, userId, questionId } }, res) =>
    database
      .updateLevel(score, userId, questionId)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

router.post(
  '/updateAnswerLevel',
  ({ body, body: { score, userId, answerId } }, res) =>
    database
      .updateAnswerLevel(score, userId, answerId)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

router.post('/addToFavorite', ({ body, body: { questionId, userId } }, res) =>
  database
    .addToFavorite(questionId, userId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post(
  '/removeFromFavorite',
  ({ body, body: { questionId, userId } }, res) =>
    database
      .removeFromFavorite(questionId, userId)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

router.post('/deleteQuestion', ({ body, body: { questionId } }, res) =>
  database
    .deleteQuestion(questionId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/deleteAnswer', ({ body, body: { answerId } }, res) =>
  database
    .deleteAnswer(answerId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/editAnswer', ({ body, body: { answerId, editedText } }, res) =>
  database
    .editAnswer(answerId, editedText)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.get('/getAnswers', ({ query: { questionId } }, res) =>
  database
    .getAnswers(questionId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getAllQuestions', ({ query: { skip, limit } }, res) =>
  database
    .getAllQuestions(Number(skip), Number(limit))
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get(
  '/getAllQuestionsSearch',
  ({ query: { searchQuery, skip, limit } }, res) =>
    database
      .getAllQuestionsSearch(searchQuery, Number(skip), Number(limit))
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err)),
)

router.get('/getUserQuestions', ({ query: { skip, limit, userId } }, res) =>
  database
    .getUserQuestions(Number(skip), Number(limit), userId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get(
  '/getUserQuestionsSearch',
  ({ query: { searchQuery, skip, limit, userId } }, res) =>
    database
      .getUserQuestionsSearch(searchQuery, Number(skip), Number(limit), userId)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err)),
)

router.get(
  '/getUserFavoriteQuestions',
  ({ query: { skip, limit, userId } }, res) =>
    database
      .getUserFavoriteQuestions(Number(skip), Number(limit), userId)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err)),
)

router.get(
  '/getUserFavoriteQuestionsSearch',
  ({ query: { searchQuery, skip, limit, userId } }, res) =>
    database
      .getUserFavoriteQuestionsSearch(
        searchQuery,
        Number(skip),
        Number(limit),
        userId,
      )
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err)),
)

router.get('/getUnsolvedQuestions', ({ query: { skip, limit } }, res) =>
  database
    .getUnsolvedQuestions(Number(skip), Number(limit))
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get(
  '/getUnsolvedQuestionsSearch',
  ({ query: { searchQuery, skip, limit } }, res) =>
    database
      .getUnsolvedQuestionsSearch(searchQuery, Number(skip), Number(limit))
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err)),
)

exports.Router = router
