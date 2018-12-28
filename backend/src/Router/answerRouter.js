const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database')

const router = express.Router()
router.use(bodyParser.json())

router.post(
  '/answers/add',
  ({ body: { questionId, username, userId, text } }, res) =>
    database
      .storeAnswer(questionId, username, userId, text)
      .then(() => res.send('submitted'))
      .catch(err => res.status(500).send(err)),
)

router.post('/answers/delete', ({ body, body: { answerId } }, res) =>
  database
    .deleteAnswer(answerId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/answers/edit', ({ body, body: { answerId, editedText } }, res) =>
  database
    .editAnswer(answerId, editedText)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.get('/answers/fetch', ({ query: { questionId } }, res) =>
  database
    .getAnswers(questionId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/answers/vote-checking', ({ query: { userId, answerId } }, res) =>
  database
    .checkIfVotedAlreadyForAnswer(userId, answerId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.post(
  '/answers/update-level',
  ({ body, body: { score, userId, answerId } }, res) =>
    database
      .updateAnswerLevel(score, userId, answerId)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

router.post('/answers/change-chosen', ({ body: { answerId, bool } }, res) =>
  database
    .changeChosen(answerId, bool)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post(
  '/replys/add',
  ({ body, body: { username, userId, answerId, text } }, res) =>
    database
      .addReply(username, userId, answerId, text)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

exports.Router = router
