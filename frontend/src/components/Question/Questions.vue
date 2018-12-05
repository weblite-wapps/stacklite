<template>
  <div class="wrapper">
    <div class="header">
      <div class="searchStuff">
        <div class="searchBy">
          <p class="lable">Search By:</p>
          <select v-model="searchFilter">
            <option v-for="(filter, i) in searchFilters" :key="i" :value="filter">{{filter}}</option>
          </select>
        </div>

        <input v-model="query" type="textbox" placeholder="Search here" class="searchBar">
      </div>

      <button @click="switchState('askingMode')" type="sbmit" class="askButton">ask question</button>
    </div>

    <div class="buttons">
      <button @click="fetchAllQuestions()" type="sbmit" class="allButton">All</button>
      
      <button @click="fetchUserQuestions()" type="sbmit" class="button">Yours</button>
      
      <button @click="fetchUserFavoriteQuestions()" type="sbmit" class="button">Favorites</button>
    </div>

    <div class="cards">
      <QuestionCard
        v-for="(question) in filteredQuestions"
        :key="question._id"
        :question="question"
        :userId="userId"
        :updateLevel="updateLevel"
        :updateLevelAgain="updateLevelAgain"
        :addToFavorite="addToFavorite"
        :removeFromFavorite="removeFromFavorite"
        :deleteQuestion="deleteQuestion"
      />
    </div>
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
    fetchAllQuestions: Function,
    fetchUserQuestions: Function,
    fetchUserFavoriteQuestions: Function,
    updateLevel: Function,
    updateLevelAgain: Function,
    addToFavorite: Function,
    removeFromFavorite: Function,
    deleteQuestion: Function,
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

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 50px;
}

.searchStuff {
  display: flex;
  flex-direction: column;
}

.searchBy {
  display: flex;
  flex-direction: row;
}

.searchBar {
  position: relative;
  top: 10px;
  right: 5px;
  padding: 8px;
  border-radius: 20px;
  background-color: #e3e3e3;
  border: 2px #191939 solid;
}

.askButton {
  position: relative;
  top: 10px;
  left: 270px;
  background-color: #e3e3e3;
  border: 3px #191939 solid;
  border-radius: 10px;
  font-size: 1.2em;
  cursor: pointer;
}

.button {
  background-color: #e3e3e3;
  border: 2px #191939 solid;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-left: 20px;
  width: 100px;
}

.allButton {
  background-color: #e3e3e3;
  border: 2px #191939 solid;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-left: 140px;
  width: 100px;
}

.buttons {
  display: flex;
  flex-direction: row;
  position: relative;
  top: 20px;
  margin-bottom: 50px;
}

input::placeholder {
  color: black;
  font-family: sans-serif;
  font-weight: bold;
}

input:focus,
button:focus {
  outline: none;
}

.button:hover,
.allButton:hover {
  border: 2px #991933 solid;
}

.lable {
  margin-right: 10px;
}

.wrapper {
  width: 98%;
  position: relative;
  top: 20px;
  align-self: center;
}

.cards {
  display: flex;
  flex-direction: column;
}
</style>