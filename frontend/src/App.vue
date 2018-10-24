<template>
  <div class="root">

    <Questions v-if="state === 'questionsMode'" :questions=questions :switchState=switchState />
    <QuestionForm v-if="state === 'askingMode'" :addQuestion="addQuestion" :switchState=switchState />

    <SnackBar/>
    <button @click="fetchData" type="sbmit">
      fetch
    </button>  
    
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
      userId: '1',
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

    fetchData() {
      requests.getAllQuestions(this.wisId).then(res => {
        this.questions = res
      })
      // requests.getUserAnswers(this.userId, this.wisId).then(res => {
      //   if (R.prop('found', res)) {
      //     this.fillMyData(res.answers)
      //   } else {
      //     this.answers = R.map(
      //       ({ type }) => (type === 'checkbox' ? [] : ''),
      //       this.questions,
      //     )
      //     switchState('answering')
      //   }
      // })
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
