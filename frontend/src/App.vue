<template>
  <div class="root">
    <Header appName="Stack Overflow"/>

    <QuestionForm
      v-if="state === 'askingMode'"
      :addQuestion="addQuestion"
      :switchState="switchState"
    />

    <Questions
      v-show="state === 'questionsMode'"
      :questions="questions"
      :userId="userId"
      :state="state"
      :fetchAllQuestions="fetchAllQuestions"
      :fetchUserQuestions="fetchUserQuestions"
      :fetchUserFavoriteQuestions="fetchUserFavoriteQuestions"
      :fetchUnsolvedQuestions="fetchUnsolvedQuestions"
      :updateLevel="updateLevel"
      :updateLevelAgain="updateLevelAgain"
      :addToFavorite="addToFavorite"
      :removeFromFavorite="removeFromFavorite"
      :switchState="switchState"
      :deleteQuestion="deleteQuestion"
      :properFetch="properFetch"
      :updateSearchQuery="updateSearchQuery"
    />

    <Answers
      v-show="state === 'answersMode'"
      :userId="userId"
      :userName="username"
      :questionTitle="question.title"
      :questionWriter="question.authorId"
      :answers="answers"
      :state="state"
      :switchStateWithFetch="switchStateWithFetch"
      :storeAnswer="storeAnswer"
      :storeReply="storeReply"
      :updateAnswerLevel="updateAnswerLevel"
      :toggleChosen="toggleChosen"
      :getFormattedDate="getFormattedDate"
      :deleteAnswer="deleteAnswer"
      :editAnswer="editAnswer"
    />

    <SnackBar/>
  </div>
</template>


<script>
// components
import QuestionForm from './components/Question/QuestionForm'
import Questions from './components/Question/Questions'
import Answers from './components/Answer/Answers'
import Header from './components/Header'
import SnackBar from './helper/components/SnackBar'

// helper
import webliteHandler from './helper/function/weblite.api'
import requests from './helper/function/handleRequests'
import bus from './helper/function/bus'

// R && W
const { R, W } = window

export default {
  name: 'App',

  components: {
    QuestionForm,
    Questions,
    Answers,
    Header,
    SnackBar,
  },

  data() {
    return {
      username: 'Armin',
      userId: '2',
      wisId: '123',
      questions: [],
      state: 'questionsMode',
      fetchQuestionState: 'all',
      answers: [],
      question: {},
      searchQuery: '',
    }
  },

  created() {
    W && webliteHandler(this)
    bus.$on('answers-mode', question => {
      this.question = question
      this.fetchAnswers()
      this.switchState('answersMode')
    })
  },

  mounted: function() {
    this.fetchAllQuestions()
  },

  methods: {
    switchState(state) {
      this.state = state
    },

    properFetch() {
      if (this.fetchQuestionState === 'all') this.fetchAllQuestions()
      else if (this.fetchQuestionState === 'user') this.fetchUserQuestions()
      else if (this.fetchQuestionState === 'favorite')
        this.fetchUserFavoriteQuestions()
      else if (this.fetchQuestionState === 'unsolved')
        this.fetchUnsolvedQuestions()
    },

    switchStateWithFetch(state) {
      this.switchState(state)
      this.properFetch()
    },

    updateSearchQuery(searchString) {
      this.searchQuery = searchString
    },

    getFormattedDate() {
      const newDate = new Date()
      const month = newDate.getMonth() + 1
      const day = newDate.getDate()
      const showMonth = month < 10 ? '0' + month : month
      const showDay = day < 10 ? '0' + day : day
      return (
        newDate.getFullYear() +
        '/' +
        showMonth +
        '/' +
        showDay +
        '|' +
        newDate.getUTCHours() +
        '/' +
        newDate.getUTCMinutes() +
        '/' +
        newDate.getUTCSeconds()
      )
    },

    fetchAllQuestions() {
      if (this.searchQuery)
        requests
          .getAllQuestionsSearch(this.searchQuery, this.wisId)
          .then(res => {
            this.questions = res
            this.fetchQuestionState = 'all'
          })
      else
        requests.getAllQuestions(this.wisId).then(res => {
          this.questions = res
          this.fetchQuestionState = 'all'
        })
    },

    fetchUserQuestions() {
      if (this.searchQuery)
        requests
          .getUserQuestionsSearch(this.searchQuery, this.userId, this.wisId)
          .then(res => {
            this.questions = res
            this.fetchQuestionState = 'user'
          })
      else
        requests.getUserQuestions(this.userId, this.wisId).then(res => {
          this.questions = res
          this.fetchQuestionState = 'user'
        })
    },

    fetchUserFavoriteQuestions() {
      if (this.searchQuery)
        requests
          .getUserFavoriteQuestionsSearch(
            this.searchQuery,
            this.userId,
            this.wisId,
          )
          .then(res => {
            this.questions = res
            this.fetchQuestionState = 'favorite'
            bus.$emit('show-message', 'fetch favorites ...')
          })
      else
        requests.getUserFavoriteQuestions(this.userId, this.wisId).then(res => {
          this.questions = res
          this.fetchQuestionState = 'favorite'
          bus.$emit('show-message', 'fetch favorites ...')
        })
    },

    fetchUnsolvedQuestions() {
      if (this.searchQuery)
        requests
          .getUnsolvedQuestionsSearch(this.searchQuery, this.wisId)
          .then(res => {
            this.questions = res
            this.fetchQuestionState = 'unsolved'
          })
      else
        requests.getUnsolvedQuestions(this.wisId).then(res => {
          this.questions = res
          this.fetchQuestionState = 'unsolved'
        })
    },

    fetchAnswers() {
      requests.getAnswers(this.question._id, this.wisId).then(res => {
        this.answers = res
        bus.$emit('show-message', 'fetch answers ...')
      })
    },

    storeAnswer(text) {
      requests
        .storeAnswer(
          this.question._id,
          this.username,
          this.userId,
          this.wisId,
          text,
          this.getFormattedDate(),
        )
        .then(() =>
          requests
            .changeAnswersNum(this.wisId, this.question._id, 1)
            .then(() => this.fetchAnswers()),
        )
    },

    storeReply(answerId, text) {
      requests
        .addReply(this.username, this.userId, this.wisId, answerId, text)
        .then(() => bus.$emit('show-message', 'reply ...'))
    },

    updateLevel(score, questionId) {
      requests
        .updateLevel(score, this.userId, this.wisId, questionId)
        .then(() => bus.$emit('show-message', 'level updated ...'))
    },

    updateLevelAgain(score, questionId) {
      requests
        .updateLevelAgain(score, this.userId, this.wisId, questionId)
        .then(() => bus.$emit('show-message', 'level updated Again! ...'))
    },

    updateAnswerLevel(score, answerId) {
      requests
        .updateAnswerLevel(score, this.userId, this.wisId, answerId)
        .then(() => bus.$emit('show-message', 'answer level updated ...'))
    },

    addQuestion(form) {
      requests
        .postQuestion(
          this.username,
          this.userId,
          this.wisId,
          form,
          this.getFormattedDate(),
        )
        .then(() => {
          this.properFetch()
          this.switchState('questionsMode')
          bus.$emit('show-message', 'question added ...')
        })
    },

    toggleChosen(answerId, bool) {
      requests.toggleChosen(answerId, this.wisId, bool).then(() => {
        const chosens = R.map(answer => answer.chosen, this.answers)
        const bool = R.reduce(R.or, false, chosens)
        requests
          .changeSolve(this.wisId, this.question._id, bool)
          .then(() =>
            bus.$emit('show-message', 'toggle and change solved happend ...'),
          )
      })
    },

    addToFavorite(questionId) {
      requests
        .addToFavorite(questionId, this.userId, this.wisId)
        .then(() => bus.$emit('show-message', 'added to favorite ...'))
    },

    removeFromFavorite(questionId) {
      requests
        .removeFromFavorite(questionId, this.userId, this.wisId)
        .then(() => bus.$emit('show-message', 'removed from favorite ...'))
    },

    deleteQuestion(questionId) {
      requests.deleteQuestion(questionId, this.wisId).then(() => {
        if (this.fetchQuestionState === 'all') this.fetchAllQuestions()
        else if (this.fetchQuestionState === 'user') this.fetchUserQuestions()
        else if (this.fetchQuestionState === 'favorite')
          this.fetchUserFavoriteQuestions()
        else if (this.fetchQuestionState === 'unsolved')
          this.fetchUnsolvedQuestions()
        this.fetchAnswers()
      })
    },

    deleteAnswer(answerId) {
      requests
        .deleteAnswer(answerId, this.wisId)
        .then(() =>
          requests
            .changeAnswersNum(this.wisId, this.question._id, -1)
            .then(() => this.fetchAnswers()),
        )
    },

    editAnswer(answerId, editedText) {
      requests
        .editAnswer(answerId, editedText, this.wisId)
        .then(() => bus.$emit('show-message', 'answer edited ...'))
    },
  },
}
</script>


<style scoped>
.root {
  position: relative;
  width: 650px;
  min-height: 900px;
  max-height: 900px;
  display: flex;
  flex-direction: column;
  border: 2px #e0e0e0 solid;
  border-radius: 20px;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  background: #e3e3e3;
}
</style>