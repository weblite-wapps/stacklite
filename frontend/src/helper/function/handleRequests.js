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

  updateLevel: (score, userId, wisId, questionId) =>
    request
      .post(config.server + '/updateLevel')
      .set('Access-Control-Allow-Origin', '*')
      .send({ score, userId, wisId, questionId })
      .catch(() =>
        bus.$emit('show-message', 'Error has occured in updating level...'),
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
}
