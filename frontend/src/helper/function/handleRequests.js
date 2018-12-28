// module
import request from 'superagent'
// helper
import bus from './bus'
// config
import config from '../../config'

export default {
  //questions
  postQuestion: (username, userId, form) =>
    request
      .post(config.server + '/questions/add')
      .set('Access-Control-Allow-Origin', '*')
      .send({ username, userId, form })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in posting Question...'),
      ),

  deleteQuestion: questionId =>
    request
      .post(config.server + '/questions/delete')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in deleting question...'),
      ),

  getQuestions: (searchQuery, skip, limit, userId, fetchType) => {
    return request
      .get(config.server + '/questions/fetch')
      .set('Access-Control-Allow-Origin', '*')
      .query({ searchQuery, skip, limit, userId, fetchType })
      .then(res => res.body)
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in getting questions...'),
      )
  },

  checkIfVotedAlreadyForQuestion: (userId, questionId) => {
    return request
      .get(config.server + '/questions/vote-checking')
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

  updateQuestionLevel: (score, userId, questionId) =>
    request
      .post(config.server + '/questions/update-level')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, questionId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in updating level...'),
      ),

  changeUserFavorite: (questionId, userId, action) =>
    request
      .post(config.server + '/questions/change-favorite')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, userId, action })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing user favorite...',
        ),
      ),

  changeSolve: (questionId, bool) =>
    request
      .post(config.server + '/questions/change-solve')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, bool })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing question solve...',
        ),
      ),

  changeAnswersCount: (questionId, change) =>
    request
      .post(config.server + '/questions/change-answer-count')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, change })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in changing answer number...',
        ),
      ),

  //answers
  storeAnswer: (questionId, username, userId, text) =>
    request
      .post(config.server + '/answers/add')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, username, userId, text })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in storing answer...'),
      ),

  deleteAnswer: answerId =>
    request
      .post(config.server + '/answers/delete')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in deleting answer...'),
      ),

  getAnswers: questionId =>
    request
      .get(config.server + '/answers/fetch')
      .set('Access-Control-Allow-Origin', '*')
      .query({ questionId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit('show-message', 'Error has occured getting answers ...'),
      ),

  editAnswer: (answerId, editedText) =>
    request
      .post(config.server + '/answers/edit')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId, editedText })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in editing answer...'),
      ),

  checkIfVotedAlreadyForAnswer: (userId, answerId) => {
    return request
      .get(config.server + '/answers/vote-checking')
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

  updateAnswerLevel: (score, userId, answerId) =>
    request
      .post(config.server + '/answers/update-level')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, answerId })
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in updating answer level...',
        ),
      ),

  toggleChosen: (answerId, bool) =>
    request
      .post(config.server + '/answers/change-chosen')
      .set('Access-Control-Allow-Origin', '*')
      .send({ answerId, bool })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in toggling chosen...'),
      ),

  addReply: (username, userId, answerId, text) =>
    request
      .post(config.server + '/replys/add')
      .set('Access-Control-Allow-Origin', '*')
      .send({ username, userId, answerId, text })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in adding reply...'),
      ),
}
