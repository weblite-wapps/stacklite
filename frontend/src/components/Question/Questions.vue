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

    <div class="inRow">
      <i @click="movePointerAndFetch(-1)" class="chevronLeft">chevron_left</i>
      <p class="fetchLable">{{fetchLable[pointer]}}</p>
      <i @click="movePointerAndFetch(1)" class="chevronRight">chevron_right</i>
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
      fetchLable: ['All', 'Yours', 'Favorite', 'Unsolved'],
      pointer: 0,
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
    fetchUnsolvedQuestions: Function,
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

    movePointerAndFetch(direction) {
      this.pointer = R.add(this.pointer, direction)
      this.pointer = R.mathMod(this.pointer, R.length(this.fetchLable))
      switch (this.pointer) {
        case 0:
          this.fetchAllQuestions()
          break
        case 1:
          this.fetchUserQuestions()
          break
        case 2:
          this.fetchUserFavoriteQuestions()
          break
        case 3:
          this.fetchUnsolvedQuestions()
          break
      }
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
.chevronLeft {
  font-size: 35px;
  top: -5px;
}

.chevronRight {
  font-size: 35px;
  top: -5px;
}

.fetchLable {
  font-size: 20px;
  font-family: sans-serif;
  left: 285px;
  padding: 5px;
  padding-bottom: 0px;
  padding-top: 0px;
  border-radius: 5px;
  background-color: #e3e3e3;
  border: 2px #515155 solid;
  min-width: 50px;
  text-align: center;
  align-self: center;
}

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

.inRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  top: 20px;
  margin-bottom: 30px;
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