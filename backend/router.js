const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')

const router = express.Router()
router.use(bodyParser.json())

router.post('/postQuestion', ({ body }, res) =>
  database
    .addQuestion(body.username, body.userId, body.wisId, body.form)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/updateLevel', ({ body }, res) =>
  database
    .updateLevel(body.score, body.userId, body.wisId, body.questionId)
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

router.get('/getUserQuestions', ({ query }, res) =>
  database
    .getUserQuestions(query.userId, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUserFavoriteQuestions', ({ query }, res) =>
  database
    .getUserFavoriteQuestions(query.userId, query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

router.get('/getAllQuestions', (req, res) =>
  database
    .getAllQuestions(req.query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err)),
)

exports.Router = router
