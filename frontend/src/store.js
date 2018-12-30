// module
import Vue from 'vue'
import Vuex from 'vuex'

//helper
import requests from './helper/function/handleRequests'
import bus from './helper/function/bus'

// R, W
const { R } = window

// set vue plugin
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // stuff came from weblite
    title: 'STACKOVERFLOW',
    username: 'armin',
    userId: '1',

    // view states
    state: 'questions', // questions, answers, asking
    fetchQuestionState: 'all', // all, user, favorite, unsoleved

    // main data
    questions: [], // [ question ],
    question: {}, // {authorName, authorId, title, text, tag, level, voters, answersCount, date, solved}
    answers: [], // [ {questionId, authorName, authorId, text, level, voters, date, replys, chosen} ]
    favoriteQuestionIds: [], // [ questionId ]
    searchQuery: '',

    //pagination
    pageNumber: 1,
    nextValid: true, // true when next page exists
    fetchAmount: 3, // number of questions per page, should be more than 1
  },

  getters: {
    skip: ({ pageNumber, fetchAmount }) => {
      return R.multiply(R.subtract(pageNumber, 1), fetchAmount)
    },
  },

  mutations: {
    setSelectedQuestion(state, question) {
      state.question = question
    },

    setFavoriteQuestionIds(state, Ids) {
      state.favoriteQuestionIds = Ids
    },

    switchState(state, viewState) {
      state.state = viewState
    },

    changePage(state, amount) {
      if (amount === undefined) state.pageNumber = 1
      else state.pageNumber = R.add(state.pageNumber, amount)
    },

    setFetchQuestionState(state, fetchType) {
      state.fetchQuestionState = fetchType
    },

    setQuestions(state, fetchedQuestions) {
      if (
        typeof fetchedQuestions === Object ||
        R.length(fetchedQuestions) <= state.fetchAmount
      ) {
        state.questions = fetchedQuestions
        state.nextValid = false
      } else {
        state.questions = R.dropLast(1, fetchedQuestions)
        state.nextValid = true
      }
    },

    setAnswers(state, answers) {
      state.answers = answers
    },
  },

  actions: {
    getFavoriteQuestionIds({ commit, state }) {
      requests
        .getFavoriteQuestionIds(state.userId)
        .then(Ids => commit('setFavoriteQuestionIds', Ids))
    },

    fetchQuestions({ commit, state, getters }, fetchType) {
      if (state.fetchQuestionState !== fetchType) commit('changePage')
      requests
        .getQuestions(
          state.searchQuery,
          getters.skip,
          R.add(state.fetchAmount, 1),
          state.userId,
          fetchType,
          state.favoriteQuestionIds,
        )
        .then(questions => {
          commit('setQuestions', questions)
          commit('setFetchQuestionState', fetchType)
        })
    },

    properFetch({ dispatch, state }) {
      dispatch('fetchQuestions', state.fetchQuestionState)
    },

    switchStateWithFetch({ commit, dispatch }, viewState) {
      dispatch('properFetch')
      commit('switchState', viewState)
    },

    fetchAnswers({ commit, state }) {
      requests
        .getAnswers(state.question._id)
        .then(answers => commit('setAnswers', answers))
    },

    storeAnswer({ state, dispatch }, text) {
      requests
        .storeAnswer(state.question._id, state.username, state.userId, text)
        .then(() =>
          requests
            .changeAnswersCount(state.question._id, 1)
            .then(() => dispatch('fetchAnswers')),
        )
    },

    storeReply({ state }, { answerId, text }) {
      requests
        .addReply(state.username, state.userId, answerId, text)
        .then(() => bus.$emit('show-message', 'reply ...'))
    },

    updateQuestionLevel({ state }, { score, questionId }) {
      return requests
        .checkIfVotedAlreadyForQuestion(state.userId, questionId)
        .then(res => {
          if (res === null)
            requests
              .updateQuestionLevel(score, state.userId, questionId)
              .then(() =>
                bus.$emit('show-message', 'question level updated ...'),
              )
          else return Promise.reject()
        })
    },

    updateAnswerLevel({ state }, { score, answerId }) {
      return requests
        .checkIfVotedAlreadyForAnswer(state.userId, answerId)
        .then(res => {
          if (res === null)
            requests
              .updateAnswerLevel(score, state.userId, answerId)
              .then(() => bus.$emit('show-message', 'answer level updated ...'))
          else return Promise.reject()
        })
    },

    addQuestion({ state, dispatch, commit }, form) {
      requests.postQuestion(state.username, state.userId, form).then(() => {
        commit('changePage')
        dispatch('switchStateWithFetch', 'questions')
      })
    },

    addUser({ state }) {
      requests
        .addUser(state.username, state.userId)
        .then(() => bus.$emit('show-message', 'user added...'))
    },

    toggleChosen({ state }, { answerId, bool }) {
      requests.toggleChosen(answerId, bool).then(() => {
        const chosens = R.map(answer => answer.chosen, state.answers)
        const bool = R.reduce(R.or, false, chosens)
        requests
          .changeSolve(state.question._id, bool)
          .then(() =>
            bus.$emit('show-message', 'toggle and change solved happend ...'),
          )
      })
    },

    changeUserFavorite({ state }, { questionId, action }) {
      requests
        .changeUserFavorite(questionId, state.userId, action)
        .then(() => bus.$emit('show-message', 'user favorite changed...'))
    },

    deleteQuestion({ dispatch }, questionId) {
      requests.deleteQuestion(questionId).then(() => {
        dispatch('properFetch')
        dispatch('fetchAnswers')
      })
    },

    deleteAnswer({ state, dispatch }, answerId) {
      requests
        .deleteAnswer(answerId)
        .then(() =>
          requests
            .changeAnswersCount(state.question._id, -1)
            .then(() => dispatch('fetchAnswers')),
        )
    },

    editAnswer(context, { answerId, editedText }) {
      requests
        .editAnswer(answerId, editedText)
        .then(() => bus.$emit('show-message', 'answer edited ...'))
    },
  },
})
