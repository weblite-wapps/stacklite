<template>
  <div class="root">

    <QuestionForm 
      v-if="state === 'askingMode'" 
      :addQuestion="addQuestion" 
      :switchState="switchState" 
    />

    <Questions 
      v-if="state === 'questionsMode'" 
      :questions="questions" 
      :userId="userId"
      :state="state"
      :fetchRecentQuestions="fetchRecentQuestions" 
      :updateLevel="updateLevel"
      :switchState="switchState"
    />
    <SnackBar/>  
  </div>
</template>


<script>
// components
import QuestionForm from './components/QuestionForm'
import Questions from './components/Questions'
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
    SnackBar,
  },

  data() {
    return {
      username: 'Armin',
      userId: '1000',
      wisId: '123',
      questions: [],
      state: 'questionsMode',
    }
  },

  created() {
    W && webliteHandler(this)
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

    updateLevel(score, userId, questionId) {
      requests
        .updateLevel(score, userId, questionId)
        .then(() => bus.$emit('show-message', 'updated ...'))
    },

    addQuestion(form) {
      requests
        .postQuestion(this.username, this.userId, this.wisId, form)
        .then(() => {
          this.switchState('questionsMode')
          bus.$emit('show-message', 'Submitted ...')
        })
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
