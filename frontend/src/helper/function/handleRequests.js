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

  updateQuestionLevel: (score, userId, questionId) =>
    request
      .post(config.server + '/updateQuestionLevel')
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

  changeUserFavorite: (questionId, userId, action) =>
    request
      .post(config.server + '/changeUserFavorite')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, userId, action })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing user favorite...',
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

  checkIfVotedAlreadyForAnswer: (userId, answerId) => {
    return request
      .get(config.server + '/checkIfVotedAlreadyForAnswer/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ userId, answerId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting answer voters...',
        ),
      )
  },

  checkIfVotedAlreadyForQuestion: (userId, questionId) => {
    return request
      .get(config.server + '/checkIfVotedAlreadyForQuestion/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ userId, questionId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting question voters...',
        ),
      )
  },

  getAllQuestions: (searchQuery, skip, limit) => {
    return request
      .get(config.server + '/getAllQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting all questions...',
        ),
      )
  },

  getUserQuestions: (searchQuery, skip, limit, userId) =>
    request
      .get(config.server + '/getUserQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, userId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user questions ...',
        ),
      ),

  getUserFavoriteQuestions: (searchQuery, skip, limit, userId) =>
    request
      .get(config.server + '/getUserFavoriteQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, userId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user favorite questions ...',
        ),
      ),

  getUnsolvedQuestions: (searchQuery, skip, limit) =>
    request
      .get(config.server + '/getUnsolvedQuestions/')
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
