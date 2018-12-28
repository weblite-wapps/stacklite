const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database')

const router = express.Router()
router.use(bodyParser.json())

router.post('/questions/add', ({ body: { username, userId, form } }, res) =>
  database
    .addQuestion(username, userId, form)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post('/questions/delete', ({ body, body: { questionId } }, res) =>
  database
    .deleteQuestion(questionId)
    .then(() => res.send(body))
    .catch(err => res.status(500).send(err)),
)

router.get(
  '/questions/fetch',
  ({ query: { searchQuery, skip, limit, userId, fetchType } }, res) => {
    const { filter, sortRule } = (function assignFilterAndSortRule() {
      switch (fetchType) {
        case 'all':
          return {
            filter: searchQuery ? { $text: { $search: searchQuery } } : {},
            sortRule: searchQuery
              ? { score: { $meta: 'textScore' } }
              : { level: -1, date: -1 },
          }
        case 'user':
          return {
            filter: searchQuery
              ? { authorId: userId, $text: { $search: searchQuery } }
              : { authorId: userId },
            sortRule: searchQuery
              ? { score: { $meta: 'textScore' } }
              : { date: -1 },
          }
        case 'favorite':
          return {
            filter: searchQuery
              ? {
                  favorite: { $all: [userId] },
                  $text: { $search: searchQuery },
                }
              : { favorite: { $all: [userId] } },
            sortRule: searchQuery
              ? { score: { $meta: 'textScore' } }
              : { date: -1 },
          }
        case 'unsolved':
          return {
            filter: searchQuery
              ? { solved: false, $text: { $search: searchQuery } }
              : { solved: false },
            sortRule: searchQuery
              ? { score: { $meta: 'textScore' } }
              : { level: -1, date: -1 },
          }
        default:
          return null
      }
    })()

    return database
      .getQuestions(Number(skip), Number(limit), filter, sortRule)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err))
  },
)

router.post(
  '/questions/change-favorite',
  ({ body, body: { questionId, userId, action } }, res) => {
    if (action === 'remove')
      return database
        .removeFromFavorite(questionId, userId)
        .then(() => res.send(body))
        .catch(err => res.status(500).send(err))
    return database
      .addToFavorite(questionId, userId)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err))
  },
)

router.get(
  '/questions/vote-checking',
  ({ query: { userId, questionId } }, res) =>
    database
      .checkIfVotedAlreadyForQuestion(userId, questionId)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err)),
)

router.post(
  '/questions/update-level',
  ({ body, body: { score, userId, questionId } }, res) =>
    database
      .updateQuestionLevel(score, userId, questionId)
      .then(() => res.send(body))
      .catch(err => res.status(500).send(err)),
)

router.post('/questions/change-solve', ({ body: { questionId, bool } }, res) =>
  database
    .changeSolve(questionId, bool)
    .then(() => res.send('submitted'))
    .catch(err => res.status(500).send(err)),
)

router.post(
  '/questions/change-answer-count',
  ({ body: { questionId, change } }, res) =>
    database
      .changeAnswersCount(questionId, change)
      .then(() => res.send('submitted'))
      .catch(err => res.status(500).send(err)),
)

exports.Router = router
