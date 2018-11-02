<template>
  <div>
    <button @click="switchState('questionsMode')" type="submit">
      back to questions
    </button>
    <br>
    <br>
    <p align="center">questionTitle: {{questionTitle}}<p/>

    <AnswerForm
      :storeAnswer="storeAnswer"
      :switchState="switchState"
    />

    <AnswerCard
      v-for="(answer, i) in answers"
      :key="i"
      :answer="answer"
      :userId="userId"
      :updateAnswerLevel="updateAnswerLevel"
      :storeReply="storeReply"
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
    answers: Array,
    switchState: Function,
    storeAnswer: Function,
    storeReply: Function,
    updateAnswerLevel: Function,
  },
}
</script>

<style>
</style>


