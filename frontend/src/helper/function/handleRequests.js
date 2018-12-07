// module
import request from 'superagent'
// helper
import bus from './bus'
// config
import config from '../../config'

export default {
  postQuestion: (username, userId, wisId, form, date) =>
    request
      .post(config.server + '/postQuestion/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ username, userId, wisId, form, date })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in posting Question...'),
      ),

  toggleChosen: (answerId, wisId, bool) =>
    request
      .post(config.server + '/toggleChosen/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId, wisId, bool })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in toggling chosen...'),
      ),

  updateLevel: (score, userId, wisId, questionId) =>
    request
      .post(config.server + '/updateLevel')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, wisId, questionId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in updating level...'),
      ),

  updateLevelAgain: (score, userId, wisId, questionId) =>
    request
      .post(config.server + '/updateLevelAgain')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, wisId, questionId })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in updating level Again...',
        ),
      ),

  changeAnswersNum: (wisId, questionId, change) =>
    request
      .post(config.server + '/changeAnswersNum')
      .set('Access-Control-Allow-Origin', '*')
      .send({ wisId, questionId, change })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing answer number...',
        ),
      ),

  changeSolve: (wisId, questionId, bool) =>
    request
      .post(config.server + '/changeSolve')
      .set('Access-Control-Allow-Origin', '*')
      .send({ wisId, questionId, bool })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing question solve...',
        ),
      ),

  updateAnswerLevel: (score, userId, wisId, answerId) =>
    request
      .post(config.server + '/updateAnswerLevel')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, wisId, answerId })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in updating answer level...',
        ),
      ),

  addToFavorite: (questionId, userId, wisId) =>
    request
      .post(config.server + '/addToFavorite')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, userId, wisId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in adding to favorite...'),
      ),

  removeFromFavorite: (questionId, userId, wisId) =>
    request
      .post(config.server + '/removeFromFavorite')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, userId, wisId })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in removing from favorite...',
        ),
      ),

  deleteQuestion: (questionId, wisId) =>
    request
      .post(config.server + '/deleteQuestion')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, wisId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in deleting question...'),
      ),

  deleteAnswer: (answerId, wisId) =>
    request
      .post(config.server + '/deleteAnswer')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId, wisId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in deleting answer...'),
      ),

  editAnswer: (answerId, editedText, wisId) =>
    request
      .post(config.server + '/editAnswer')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId, editedText, wisId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in editing answer...'),
      ),

  getAllQuestions: (skip, limit, wisId) =>
    request
      .get(config.server + '/getAllQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting all questions...',
        ),
      ),

  getAllQuestionsSearch: (searchQuery, skip, limit, wisId) =>
    request
      .get(config.server + '/getAllQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting all questions...',
        ),
      ),

  getUserQuestions: (skip, limit, userId, wisId) =>
    request
      .get(config.server + '/getUserQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit, userId, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user questions ...',
        ),
      ),

  getUserQuestionsSearch: (searchQuery, skip, limit, userId, wisId) =>
    request
      .get(config.server + '/getUserQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, userId, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user questions ...',
        ),
      ),

  getUserFavoriteQuestions: (skip, limit, userId, wisId) =>
    request
      .get(config.server + '/getUserFavoriteQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit, userId, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user favorite questions ...',
        ),
      ),

  getUserFavoriteQuestionsSearch: (searchQuery, skip, limit, userId, wisId) =>
    request
      .get(config.server + '/getUserFavoriteQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, userId, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user favorite questions ...',
        ),
      ),

  getUnsolvedQuestions: (skip, limit, wisId) =>
    request
      .get(config.server + '/getUnsolvedQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ skip, limit, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting unsolved questions...',
        ),
      ),

  getUnsolvedQuestionsSearch: (searchQuery, skip, limit, wisId) =>
    request
      .get(config.server + '/getUnsolvedQuestionsSearch/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting unsolved questions...',
        ),
      ),

  getAnswers: (questionId, wisId) =>
    request
      .get(config.server + '/getAnswers/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ questionId, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit('show-message', 'Error has occured getting answers ...'),
      ),

  storeAnswer: (questionId, username, userId, wisId, text, date) =>
    request
      .post(config.server + '/storeAnswer/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, username, userId, wisId, text, date })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in storing answer...'),
      ),

  addReply: (username, userId, wisId, answerId, text) =>
    request
      .post(config.server + '/addReply')
      .set('Access-Control-Allow-Origin', '*')
      .send({ username, userId, wisId, answerId, text })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in adding reply...'),
      ),
}
