<template>
  <div>
    <button @click="switchState('questionsMode')" type="submit">
      back to questions
    </button>
    <br>
    <br>
    <p align="center">questionTitle: {{questionTitle}}<p/>

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

    <br>
    <br>
    <br>
    <br>
    <AnswerForm
      :storeAnswer="storeAnswer"
      :switchState="switchState"
    />

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

<style>
</style>


