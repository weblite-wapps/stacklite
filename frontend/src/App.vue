<template>
  <div class="root">
    
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
      :addToFavorite="addToFavorite"
      :removeFromFavorite="removeFromFavorite"
      :switchState="switchState"
    />

    <Answers
      v-show="state === 'answersMode'"
      :userId="userId"
      :questionTitle="question.title"
      :questionWriter="question.authorId"
      :answers="answers"
      :state="state"
      :switchState="switchState"
      :storeAnswer="storeAnswer"
      :storeReply="storeReply"
      :updateAnswerLevel="updateAnswerLevel"
      :toggleChosen="toggleChosen"
    />

    <SnackBar/>  

  </div>
</template>


<script>
// components
import QuestionForm from './components/QuestionForm'
import Questions from './components/Questions'
import Answers from './components/Answers'
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
    SnackBar,
  },

  data() {
    return {
      username: 'Armin',
      userId: '1',
      wisId: '123',
      questions: [],
      state: 'questionsMode',
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

    fetchRecentQuestions() {
      requests.getAllQuestions(this.wisId).then(res => {
        this.questions = res
      })
    },

    fetchUserQuestions() {
      requests.getUserQuestions(this.userId, this.wisId).then(res => {
        this.questions = res
      })
    },

    fetchUserFavoriteQuestions() {
      requests.getUserFavoriteQuestions(this.userId, this.wisId).then(res => {
        this.questions = res
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
        )
        .then(() => {
          bus.$emit('show-message', 'answer added ...')
        })
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

    updateAnswerLevel(score, answerId) {
      requests
        .updateAnswerLevel(score, this.userId, this.wisId, answerId)
        .then(() => bus.$emit('show-message', 'answer level updated ...'))
    },

    addQuestion(form) {
      requests
        .postQuestion(this.username, this.userId, this.wisId, form)
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
  },
}
</script>


<style scoped>
.root {
  position: relative;
  width: 600px;
  min-height: 900px;
  max-height: 900px;
  display: flex;
  flex-direction: column;
  border: 1px #e0e0e0 solid;
  border-radius: 5px;
  overflow: hidden;
  background: #f0f0f098;
}
</style>
