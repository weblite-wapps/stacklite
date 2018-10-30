<template>
  <div>
    <button @click="switchState('questionsMode')" type="submit">
      back to questions
    <button/>
    {{questionTitle}}

    <AnswerForm
      :storeAnswer="storeAnswer"
    />

    <AnswerCard
      v-for="(answer, i) in answers"
      :key="i"
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
    answers: Array,
    questionTitle: String,
    switchState: Function,
    storeAnswer: Function,
  },
}
</script>

<style>
</style>


