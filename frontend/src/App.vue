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
      :addToFavorite="addToFavorite"
      :removeFromFavorite="removeFromFavorite"
      :switchState="switchState"
      :deleteQuestion="deleteQuestion"
      :properFetch="properFetch"
      :updateSearchQuery="updateSearchQuery"
      :changePage="changePage"
      :pageNumber="pageNumber"
      :nextValid="nextValid"
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
      userId: '1',
      questions: [],
      state: 'questionsMode',
      fetchQuestionState: 'all',
      answers: [],
      question: {},
      searchQuery: '',
      pageNumber: 1,
      nextValid: true,
      fetchAmount: 3, /// set to more than 1
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
      switch (this.fetchQuestionState) {
        case 'all':
          this.fetchAllQuestions()
          break
        case 'user':
          this.fetchUserQuestions()
          break
        case 'favorite':
          this.fetchUserFavoriteQuestions()
          break
        case 'unsolved':
          this.fetchUnsolvedQuestions()
          break
      }
    },

    switchStateWithFetch(state) {
      this.properFetch()
      this.switchState(state)
    },

    updateSearchQuery(searchString) {
      this.searchQuery = searchString
    },

    changePage(amount) {
      this.pageNumber = R.add(this.pageNumber, amount)
    },

    setQuestions(res) {
      if (typeof res === Object || R.length(res) <= this.fetchAmount) {
        this.questions = res
        this.nextValid = false
      } else {
        this.questions = R.dropLast(1, res)
        this.nextValid = true
      }
    },

    fetchAllQuestions() {
      this.pageNumber = this.fetchQuestionState === 'all' ? this.pageNumber : 1
      requests
        .getAllQuestions(
          this.searchQuery,
          this.skip,
          R.add(this.fetchAmount, 1),
        )
        .then(res => {
          this.setQuestions(res)
          this.fetchQuestionState = 'all'
        })
    },

    fetchUserQuestions() {
      this.pageNumber = this.fetchQuestionState === 'user' ? this.pageNumber : 1
      requests
        .getUserQuestions(
          this.searchQuery,
          this.skip,
          R.add(this.fetchAmount, 1),
          this.userId,
        )
        .then(res => {
          this.setQuestions(res)
          this.fetchQuestionState = 'user'
        })
    },

    fetchUserFavoriteQuestions() {
      this.pageNumber =
        this.fetchQuestionState === 'favorite' ? this.pageNumber : 1
      requests
        .getUserFavoriteQuestions(
          this.searchQuery,
          this.skip,
          R.add(this.fetchAmount, 1),
          this.userId,
        )
        .then(res => {
          this.setQuestions(res)
          this.fetchQuestionState = 'favorite'
        })
    },

    fetchUnsolvedQuestions() {
      this.pageNumber =
        this.fetchQuestionState === 'unsolved' ? this.pageNumber : 1
      requests
        .getUnsolvedQuestions(
          this.searchQuery,
          this.skip,
          R.add(this.fetchAmount, 1),
        )
        .then(res => {
          this.setQuestions(res)
          this.fetchQuestionState = 'unsolved'
        })
    },

    fetchAnswers() {
      requests.getAnswers(this.question._id).then(res => {
        this.answers = res
      })
    },

    storeAnswer(text) {
      requests
        .storeAnswer(this.question._id, this.username, this.userId, text)
        .then(() =>
          requests
            .changeAnswersNum(this.question._id, 1)
            .then(() => this.fetchAnswers()),
        )
    },

    storeReply(answerId, text) {
      requests
        .addReply(this.username, this.userId, answerId, text)
        .then(() => bus.$emit('show-message', 'reply ...'))
    },

    updateLevel(score, questionId) {
      requests
        .updateLevel(score, this.userId, questionId)
        .then(() => bus.$emit('show-message', 'level updated ...'))
    },

    updateAnswerLevel(score, answerId) {
      requests
        .updateAnswerLevel(score, this.userId, answerId)
        .then(() => bus.$emit('show-message', 'answer level updated ...'))
    },

    addQuestion(form) {
      requests.postQuestion(this.username, this.userId, form).then(() => {
        this.pageNumber = 1
        this.switchStateWithFetch('questionsMode')
      })
    },

    toggleChosen(answerId, bool) {
      requests.toggleChosen(answerId, bool).then(() => {
        const chosens = R.map(answer => answer.chosen, this.answers)
        const bool = R.reduce(R.or, false, chosens)
        requests
          .changeSolve(this.question._id, bool)
          .then(() =>
            bus.$emit('show-message', 'toggle and change solved happend ...'),
          )
      })
    },

    addToFavorite(questionId) {
      requests
        .addToFavorite(questionId, this.userId)
        .then(() => bus.$emit('show-message', 'added to favorite ...'))
    },

    removeFromFavorite(questionId) {
      requests
        .removeFromFavorite(questionId, this.userId)
        .then(() => bus.$emit('show-message', 'removed from favorite ...'))
    },

    deleteQuestion(questionId) {
      requests.deleteQuestion(questionId).then(() => {
        this.properFetch()
        this.fetchAnswers()
      })
    },

    deleteAnswer(answerId) {
      requests
        .deleteAnswer(answerId)
        .then(() =>
          requests
            .changeAnswersNum(this.question._id, -1)
            .then(() => this.fetchAnswers()),
        )
    },

    editAnswer(answerId, editedText) {
      requests
        .editAnswer(answerId, editedText)
        .then(() => bus.$emit('show-message', 'answer edited ...'))
    },
  },

  watch: {
    fetchQuestionState: function() {
      this.pageNumber = 1
    },
  },

  computed: {
    skip() {
      return R.multiply(R.subtract(this.pageNumber, 1), this.fetchAmount)
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