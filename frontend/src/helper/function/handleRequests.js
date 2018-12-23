// module
import request from 'superagent'
// helper
import bus from './bus'
// config
import config from '../../config'

export default {
  postQuestion: (username, userId, form) =>
    request
      .post(config.server + '/postQuestion/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ username, userId, form })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in posting Question...'),
      ),

  toggleChosen: (answerId, bool) =>
    request
      .post(config.server + '/toggleChosen/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId, bool })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in toggling chosen...'),
      ),

  updateLevel: (score, userId, questionId) =>
    request
      .post(config.server + '/updateLevel')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, questionId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in updating level...'),
      ),

  changeAnswersNum: (questionId, change) =>
    request
      .post(config.server + '/changeAnswersNum')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, change })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing answer number...',
        ),
      ),

  changeSolve: (questionId, bool) =>
    request
      .post(config.server + '/changeSolve')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, bool })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing question solve...',
        ),
      ),

  updateAnswerLevel: (score, userId, answerId) =>
    request
      .post(config.server + '/updateAnswerLevel')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, answerId })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in updating answer level...',
        ),
      ),

  addToFavorite: (questionId, userId) =>
    request
      .post(config.server + '/addToFavorite')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, userId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in adding to favorite...'),
      ),

  removeFromFavorite: (questionId, userId) =>
    request
      .post(config.server + '/removeFromFavorite')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, userId })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in removing from favorite...',
        ),
      ),

  deleteQuestion: questionId =>
    request
      .post(config.server + '/deleteQuestion')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in deleting question...'),
      ),

  deleteAnswer: answerId =>
    request
      .post(config.server + '/deleteAnswer')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in deleting answer...'),
      ),

  editAnswer: (answerId, editedText) =>
    request
      .post(config.server + '/editAnswer')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId, editedText })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in editing answer...'),
      ),

  getAllQuestions: (skip, limit) =>
    request
      .get(config.server + '/getAllQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting all questions...',
        ),
      ),

  getAllQuestionsSearch: (searchQuery, skip, limit) =>
    request
      .get(config.server + '/getAllQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting all questions...',
        ),
      ),

  getUserQuestions: (skip, limit, userId) =>
    request
      .get(config.server + '/getUserQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit, userId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user questions ...',
        ),
      ),

  getUserQuestionsSearch: (searchQuery, skip, limit, userId) =>
    request
      .get(config.server + '/getUserQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, userId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user questions ...',
        ),
      ),

  getUserFavoriteQuestions: (skip, limit, userId) =>
    request
      .get(config.server + '/getUserFavoriteQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit, userId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user favorite questions ...',
        ),
      ),

  getUserFavoriteQuestionsSearch: (searchQuery, skip, limit, userId) =>
    request
      .get(config.server + '/getUserFavoriteQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, userId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user favorite questions ...',
        ),
      ),

  getUnsolvedQuestions: (skip, limit) =>
    request
      .get(config.server + '/getUnsolvedQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting unsolved questions...',
        ),
      ),

  getUnsolvedQuestionsSearch: (searchQuery, skip, limit) =>
    request
      .get(config.server + '/getUnsolvedQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting unsolved questions...',
        ),
      ),

  getAnswers: questionId =>
    request
      .get(config.server + '/getAnswers/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ questionId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit('show-message', 'Error has occured getting answers ...'),
      ),

  storeAnswer: (questionId, username, userId, text) =>
    request
      .post(config.server + '/storeAnswer/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, username, userId, text })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in storing answer...'),
      ),

  addReply: (username, userId, answerId, text) =>
    request
      .post(config.server + '/addReply')
      .set('Access-Control-Allow-Origin', '*')
      .send({ username, userId, answerId, text })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in adding reply...'),
      ),
}
