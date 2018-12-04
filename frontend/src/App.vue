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
      :fetchRecentQuestions="fetchRecentQuestions"
      :fetchUserQuestions="fetchUserQuestions"
      :fetchUserFavoriteQuestions="fetchUserFavoriteQuestions"
      :updateLevel="updateLevel"
      :updateLevelAgain="updateLevelAgain"
      :addToFavorite="addToFavorite"
      :removeFromFavorite="removeFromFavorite"
      :switchState="switchState"
      :deleteQuestion="deleteQuestion"
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
import { request } from 'http'

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
      wisId: '123',
      questions: [],
      state: 'questionsMode',
      fetchedQuestions: 'recent',
      answers: [],
      question: {},
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
    this.fetchRecentQuestions()
  },

  methods: {
    switchState(state) {
      this.state = state
    },

    switchStateWithFetch(state) {
      this.switchState(state)
      if (this.fetchedQuestions === 'recent') this.fetchRecentQuestions()
      else if (this.fetchedQuestions === 'user') this.fetchUserQuestions()
      else if (this.fetchedQuestions === 'favorite')
        this.fetchUserFavoriteQuestions()
    },

    getFormattedDate() {
      const newDate = new Date()
      return (
        newDate.getFullYear() +
        '/' +
        (newDate.getMonth() + 1) +
        '/' +
        newDate.getDate()
      )
    },

    fetchRecentQuestions() {
      requests.getAllQuestions(this.wisId).then(res => {
        this.questions = res
        this.fetchedQuestions = 'recent'
      })
    },

    fetchUserQuestions() {
      requests.getUserQuestions(this.userId, this.wisId).then(res => {
        this.questions = res
        this.fetchedQuestions = 'user'
      })
    },

    fetchUserFavoriteQuestions() {
      requests.getUserFavoriteQuestions(this.userId, this.wisId).then(res => {
        this.questions = res
        this.fetchedQuestions = 'favorite'
        bus.$emit('show-message', 'fetch favorites ...')
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
          this.fetchRecentQuestions()
          this.switchState('questionsMode')
          bus.$emit('show-message', 'question added ...')
        })
    },

    toggleChosen(answerId, bool) {
      requests.toggleChosen(answerId, this.wisId, bool).then(() => {
        bus.$emit('show-message', 'chosen toggled ...')
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
        if (this.fetchedQuestions === 'recent') this.fetchRecentQuestions()
        else if (this.fetchedQuestions === 'user') this.fetchUserQuestions()
        else if (this.fetchedQuestions === 'favorite')
          this.fetchUserFavoriteQuestions()
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