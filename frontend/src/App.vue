<template>
  <div class="root">
    <QuestionForm :addQuestion="addQuestion" />
    <SnackBar/>
    <button @click="fetchData" type="sbmit">
      fetch
    </button>
    {{questions}}
  </div>
</template>


<script>
// components
import QuestionForm from './components/QuestionForm'
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
    SnackBar,
  },

  data() {
    return {
      username: 'Armin',
      userId: '1',
      wisId: '123',
      questions: [],
    }
  },

  created() {
    W && webliteHandler(this)
  },

  methods: {
    fetchData() {
      requests.getAllQuestions(this.wisId).then(res => {
        this.questions = res
        //switchState('reviewing')
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
      const valid = form.title == '' || form.text == '' ? false : true
      if (!valid) bus.$emit('show-message', 'please fill all requirements ...')
      else {
        requests
          .postQuestion(this.username, this.userId, this.wisId, form)
          .then(() => {
            //switchState('reviewing')
            bus.$emit('show-message', 'Submitted ...')
          })
      }
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
