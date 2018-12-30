// module
import Vue from 'vue'
import Vuex from 'vuex'

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
    page: 'LIST', // VIT, LIST, DONE
    currentAction: '', // remove, vit, done, list-right, list-left

    // main data
    todos: [], // [{ id, text, creator, functor, vit }],
  },

  getters: {
    filteredTodos({ page, todos }) {
      const filterFunction =
        page === 'VIT'
          ? ({ vit, functor }) => vit && !functor
          : page === 'DONE'
            ? R.prop('functor')
            : page === 'LIST'
              ? ({ vit, functor }) => !vit && !functor
              : R.always(false)

      return R.compose(
        R.reverse,
        R.filter(filterFunction),
      )(todos)
    },

    donePercentage({ todos }) {
      const numberOfDone = todos.filter(R.prop('functor')).length
      const numberOfAll = todos.length
      if (numberOfAll === 0) return 0
      else return ((numberOfDone / numberOfAll) * 100).toFixed(0)
    },
  },

  mutations: {
    changeWebliteRelatedData(state, { title, username, isAdmin }) {
      state.username = username
      state.title = title
      state.isAdmin = isAdmin
    },

    changeTitle(state, title) {
      state.title = title
    },

    changePage(state, page) {
      state.page = page
    },

    changeTodos(state, todos) {
      state.todos = todos
    },

    changeCurrentAction(state, action) {
      state.currentAction = action
    },
  },

  actions: {
    changeCurrentAction({ commit }, value) {
      commit('changeCurrentAction', value)
    },
  },
})
