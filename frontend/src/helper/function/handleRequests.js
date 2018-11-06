// module
import request from 'superagent'
// helper
import bus from './bus'
// config
import config from '../../config'

export default {
  postQuestion: (username, userId, wisId, form) =>
    request
      .post(config.server + '/postQuestion/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ username, userId, wisId, form })
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

  getUserQuestions: (userId, wisId) =>
    request
      .get(config.server + '/getUserQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ userId, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user questions ...',
        ),
      ),

  getUserFavoriteQuestions: (userId, wisId) =>
    request
      .get(config.server + '/getUserFavoriteQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ userId, wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured getting user favorite questions ...',
        ),
      ),

  getAllQuestions: wisId =>
    request
      .get(config.server + '/getAllQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ wisId })
      .then(res => res.body)
      .catch(() =>
        bus.$emit(
          'show-message',
          'Error has occured in getting all questions...',
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

  storeAnswer: (questionId, username, userId, wisId, text) =>
    request
      .post(config.server + '/storeAnswer/')
      .set('Access-Control-Allow-Origin', '*')
      .send({ questionId, username, userId, wisId, text })
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
