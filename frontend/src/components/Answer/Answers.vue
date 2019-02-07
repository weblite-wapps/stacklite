<template>
  <div class="ansRoot">
    <button
      @click="$store.dispatch('switchStateWithFetch', 'questions')"
      type="submit"
      class="backToQuestions"
    >Questions</button>

    <p class="qTitle">{{question.title}}</p>
    <p/>

    <AnswerForm v-if="state === 'answers'"/>

    <div class="ansCards">
      <AnswerCard v-for="(answer, i) in answers" :key="i" :answer="answer"/>
    </div>
  </div>
</template>

<script>
// modules
import { mapState } from 'vuex'

//components
import AnswerForm from './AnswerForm'
import AnswerCard from './AnswerCard'

export default {
  components: {
    AnswerForm,
    AnswerCard,
  },

  computed: mapState(['question', 'answers', 'state']),
}
</script>

<style scoped>
.ansRoot {
  width: 100%;
}

.backToQuestions {
  position: relative;
  border: 2px rgb(24, 21, 54) solid;
  border-radius: 15px;
  width: 80px;
  height: 60px;
  font-size: 1em;
  letter-spacing: -1px;
  font-family: sans-serif;
  font-weight: bold;
  padding: 0px;
  background: #a99dc5;
  top: 60px;
  left: 25px;
}

.qTitle {
  position: relative;
  height: 40px;
  font-size: 1.4em;
  letter-spacing: -1px;
  font-family: sans-serif;
  font-weight: bold;
  padding: 0px;
  text-shadow: 1.2px -1.2px #272222;
  margin: 0 auto;
  text-align: center;
  bottom: 40px;
}

button:focus {
  outline: none;
}

button:hover {
  cursor: pointer;
}

.ansCards {
  display: flex;
  flex-direction: column;
}
</style>


