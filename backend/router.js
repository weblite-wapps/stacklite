const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')

const router = express.Router()
router.use(bodyParser.json())

router.post('/postQuestion', ({ body }, res) =>
  database
    .addQuestion(body.username, body.userId, body.wisId, body.form, body.date)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/changeAnswersNum', ({ body }, res) =>
  database
    .changeAnswersNum(body.wisId, body.questionId, body.change)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/changeSolve', ({ body }, res) =>
  database
    .changeSolve(body.wisId, body.questionId, body.bool)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/toggleChosen', ({ body }, res) =>
  database
    .toggleChosen(body.answerId, body.wisId, body.bool)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/storeAnswer', ({ body }, res) =>
  database
    .storeAnswer(
      body.questionId,
      body.username,
      body.userId,
      body.wisId,
      body.text,
      body.date,
    )
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/addReply', ({ body }, res) =>
  database
    .addReply(body.username, body.userId, body.wisId, body.answerId, body.text)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/updateLevel', ({ body }, res) =>
  database
    .updateLevel(body.score, body.userId, body.wisId, body.questionId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/updateLevelAgain', ({ body }, res) =>
  database
    .updateLevelAgain(body.score, body.userId, body.wisId, body.questionId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/updateAnswerLevel', ({ body }, res) =>
  database
    .updateAnswerLevel(body.score, body.userId, body.wisId, body.answerId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/addToFavorite', ({ body }, res) =>
  database
    .addToFavorite(body.questionId, body.userId, body.wisId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/removeFromFavorite', ({ body }, res) =>
  database
    .removeFromFavorite(body.questionId, body.userId, body.wisId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/deleteQuestion', ({ body }, res) =>
  database
    .deleteQuestion(body.questionId, body.wisId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/deleteAnswer', ({ body }, res) =>
  database
    .deleteAnswer(body.answerId, body.wisId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.post('/editAnswer', ({ body }, res) =>
  database
    .editAnswer(body.answerId, body.editedText, body.wisId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.get('/getAnswers', ({ query }, res) =>
  database
    .getAnswers(query.questionId, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getAllQuestions', (req, res) =>
  database
    .getAllQuestions(req.query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getAllQuestionsSearch', ({ query }, res) =>
  database
    .getAllQuestionsSearch(query.searchQuery, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUserQuestions', ({ query }, res) =>
  database
    .getUserQuestions(query.userId, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUserQuestionsSearch', ({ query }, res) =>
  database
    .getUserQuestionsSearch(query.searchQuery, query.userId, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUserFavoriteQuestions', ({ query }, res) =>
  database
    .getUserFavoriteQuestions(query.userId, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUserFavoriteQuestionsSearch', ({ query }, res) =>
  database
    .getUserFavoriteQuestionsSearch(
      query.searchQuery,
      query.userId,
      query.wisId,
    )
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUnsolvedQuestions', (req, res) =>
  database
    .getUnsolvedQuestions(req.query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUnsolvedQuestionsSearch', ({ query }, res) =>
  database
    .getUnsolvedQuestionsSearch(query.searchQuery, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

exports.Router = router
