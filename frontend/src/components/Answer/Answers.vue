<template>
  <div class="ansRoot">
    <button @click="switchState('questionsMode')" type="submit" class="backToQuestions">
      Questions
    </button>

    <p class="qTitle">{{questionTitle}}<p/>

    <AnswerForm
      :storeAnswer="storeAnswer"
      :switchState="switchState"
    />
    <div class="ansCards">
      <AnswerCard
        v-for="(answer, i) in answers"
        :key="i"
        :answer="answer"
        :userId="userId"
        :questionWriter="questionWriter"
        :updateAnswerLevel="updateAnswerLevel"
        :storeReply="storeReply"
        :state="state"
        :toggleChosen="toggleChosen"
      />
    </div>
  </div>
</template>

<script>
//components
import AnswerForm from './AnswerForm'
import AnswerCard from './AnswerCard'

export default {
  components: {
    AnswerForm,
    AnswerCard,
  },

  props: {
    userId: String,
    questionTitle: String,
    questionWriter: String,
    answers: Array,
    state: String,
    switchState: Function,
    storeAnswer: Function,
    storeReply: Function,
    updateAnswerLevel: Function,
    toggleChosen: Function,
  },
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


