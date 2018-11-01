<template>
  <div>
    Search By :
      <select v-model="searchFilter">
        <option
          v-for="(filter, i) in searchFilters"
          :key="i"
          :value="filter"
        > {{filter}} </option>
      </select>

    <input
      v-model="query"
      type="textbox"
      placeholder="Search here"
    >

    <button @click="switchState('askingMode')" type="sbmit">
      ask question
    </button>

    <button @click="fetchRecentQuestions()" type="sbmit">
      recent
    </button> 

    <button @click="fetchUserQuestions()" type="sbmit">
      yours
    </button>

    <button @click="fetchUserFavoriteQuestions()" type="sbmit">
      favorites
    </button>

    <QuestionCard 
      v-for="(question) in filteredQuestions"
      :key="question._id"
      :question="question"
      :userId="userId"
      :updateLevel="updateLevel"
      :addToFavorite="addToFavorite"
      :removeFromFavorite="removeFromFavorite"
    />

  </div>
</template>

<script>
//components
import QuestionCard from './QuestionCard'

export default {
  name: 'Questions',

  components: {
    QuestionCard,
  },

  data() {
    return {
      query: '',
      searchFilter: 'title',
      searchFilterTemp: '',
      searchFilters: ['title', 'tag', 'author', 'text', 'date', 'level'],
    }
  },

  props: {
    questions: [Array, Object],
    userId: String,
    state: String,
    switchState: Function,
    fetchRecentQuestions: Function,
    fetchUserQuestions: Function,
    fetchUserFavoriteQuestions: Function,
    updateLevel: Function,
    addToFavorite: Function,
    removeFromFavorite: Function,
  },

  methods: {
    searchTitle(question) {
      if (!this.query.length) return true
      this.searchFilter === 'author'
        ? (this.searchFilterTemp = 'authorName')
        : (this.searchFilterTemp = this.searchFilter)

      const position = R.prop(this.searchFilterTemp, question)
        .toString()
        .toLowerCase()
        .search(this.query.toLowerCase())
      return position < 0 ? false : true
    },
  },

  computed: {
    filteredQuestions() {
      return R.filter(this.searchTitle, R.reverse(this.questions))
    },
  },
}
</script>

<style>
</style>


