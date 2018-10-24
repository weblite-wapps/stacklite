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
    .updateLevel(body.score, body.userId, body.questionId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.get('/getUserAnswer', ({ query }, res) =>
  database
    .getUserAnswer(query.userId, query.wisId)
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
