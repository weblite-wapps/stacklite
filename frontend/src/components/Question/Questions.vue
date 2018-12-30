<template>
  <div class="wrapper">
    <div class="header">
      <input
        v-model="searchString"
        type="textbox"
        placeholder="Search here . . ."
        maxlength="50"
        class="searchBar"
      >
      <i @click="searchAndFetch" class="searchButton">search</i>
      
      <button @click="switchState('asking')" type="sbmit" class="askButton">ask question</button>
    </div>

    <div class="inRow">
      <p @click="fetchQuestions('all')" class="fetchLableButton">All</p>
      <p @click="fetchQuestions('user')" class="fetchLableButton">Yours</p>
      <p @click="fetchQuestions('favorite')" class="fetchLableButton">Favorite</p>
      <p @click="fetchQuestions('unsolved')" class="fetchLableButton">Unsolved</p>
    </div>

    <div class="cards">
      <QuestionCard
        v-for="(question) in questions"
        :key="question._id"
        :question="question"
        :favoriteQuestionIds="favoriteQuestionIds"
        :getFavoriteQuestionIds="getFavoriteQuestionIds"
        :userId="userId"
        :updateQuestionLevel="updateQuestionLevel"
        :changeUserFavorite="changeUserFavorite"
        :deleteQuestion="deleteQuestion"
      />
    </div>
    <div class="inRow">
      <p v-if="pageNumber !== 1" @click="goPrevious()" class="prePage">prev</p>
      <p v-if="haveNumber()">{{pageNumber}}</p>
      <p v-if="nextValid" @click="goNext()" class="nextPage">next</p>
    </div>
  </div>
</template>

<script>
//helper
import bus from '../../helper/function/bus'
//components
import QuestionCard from './QuestionCard'

export default {
  name: 'Questions',

  components: {
    QuestionCard,
  },

  props: {
    questions: [Array, Object],
    favoriteQuestionIds: Array,
    getFavoriteQuestionIds: Function,
    userId: String,
    state: String,
    switchState: Function,
    fetchQuestions: Function,
    updateQuestionLevel: Function,
    changeUserFavorite: Function,
    deleteQuestion: Function,
    updateSearchQuery: Function,
    changePage: Function,
    properFetch: Function,
    pageNumber: Number,
    nextValid: Boolean,
  },

  data() {
    return {
      searchString: '',
    }
  },

  watch: {
    searchString: function() {
      this.updateSearchQuery(this.searchString)
    },
  },

  created: function() {
    bus.$on('search-tag', tag => {
      this.searchString = tag
      this.searchAndFetch()
    })
  },

  methods: {
    haveNumber() {
      return R.length(this.questions) > 0 ? true : false
    },

    searchAndFetch() {
      this.updateSearchQuery(this.searchString)
      this.changePage()
      this.properFetch()
    },

    goPrevious() {
      this.changePage(-1)
      this.properFetch()
    },

    goNext() {
      this.changePage(1)
      this.properFetch()
    },
  },
}
</script>

<style scoped>
.nextPage {
  position: absolute;
  left: 330px;
  font-size: 16px;
  font-weight: bold;
  font-family: sans-serif;
  border: 2px black solid;
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
}

.prePage {
  position: absolute;
  left: 250px;
  font-size: 16px;
  font-weight: bold;
  font-family: sans-serif;
  border: 2px black solid;
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
}

.fetchLableButton {
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
  margin-right: 20px;
  cursor: pointer;
}

.header {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 50px;
}

.searchBar {
  position: relative;
  top: 10px;
  left: 15px;
  padding: 8px;
  border-radius: 20px;
  background-color: #e3e3e3;
  border: 2px #191939 solid;
  font-size: 15px;
}

.searchButton {
  position: relative;
  left: 15px;
  top: 13px;
  font-size: 30px;
}

.askButton {
  position: relative;
  top: 10px;
  left: 250px;
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