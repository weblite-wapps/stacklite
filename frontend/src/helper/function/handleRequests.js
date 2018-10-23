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
      .catch(() => bus.$emit('show-message', 'Error has occured ...')),

  getUserAnswers: (userId, wisId) =>
    request
      .get(config.server + '/getUserAnswer/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ userId, wisId })
      .then(res => res.body)
      .catch(() => bus.$emit('show-message', 'Error has occured ...')),

  getAllQuestions: wisId =>
    request
      .get(config.server + '/getAllQuestions/')
      .set('Access-Control-Allow-Origin', '*')
      .query({ wisId })
      .then(res => res.body)
      .catch(() => bus.$emit('show-message', 'Error has occured ...')),
}
