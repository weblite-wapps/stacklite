const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database')

const router = express.Router()
router.use(bodyParser.json())

router.post('/users/add', ({ body: { username, userId } }, res) =>
  database
    .addUser(username, userId)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.get('/users/favorites/fetch', ({ query: { userId } }, res) =>
  database
    .getFavoriteQuestionIds(userId)
    .then(data => res.send(data.favoriteQuestions))
    .catch(err => res.status(500).send(err)),
)

router.post(
  '/users/favorites/change',
  ({ body, body: { questionId, userId, action } }, res) =>
    database
      .changeUserFavorite(questionId, userId, action)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

exports.Router = router
