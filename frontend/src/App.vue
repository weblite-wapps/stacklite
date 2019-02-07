<template>
  <div class="root">
    <Header appName="Stack Overflow"/>

    <QuestionForm v-if="state === 'asking'"/>

    <Questions v-show="state === 'questions'"/>

    <Answers v-show="state === 'answers'"/>

    <SnackBar/>
  </div>
</template>


<script>
// modules
import { mapState } from 'vuex'

// components
import QuestionForm from './components/Question/QuestionForm'
import Questions from './components/Question/Questions'
import Answers from './components/Answer/Answers'
import Header from './components/Header'
import SnackBar from './helper/components/SnackBar'

// helper
import webliteHandler from './helper/function/weblite.api'
import bus from './helper/function/bus'

// R && W
const { R, W } = window

// store
import store from './store'

export default {
  name: 'App',

  store,

  components: {
    QuestionForm,
    Questions,
    Answers,
    Header,
    SnackBar,
  },

  computed: mapState(['state']),

  created() {
    W && webliteHandler(this)
    bus.$on('answers-mode', question => {
      this.$store.commit('setSelectedQuestion', question)
      this.$store.dispatch('fetchAnswers')
      this.$store.commit('switchState', 'answers')
    })
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