<template>
  <div>
    <button @click="switchState('askingMode')" type="sbmit">
      ask question
    </button>
    <button @click="fetchRecentQuestions()" type="sbmit">
      recent
    </button> 

    <QuestionCard 
      v-for="(q, i) in questions"
      :key="i"
      :question="q"
      :userId="userId"
      :state="state"
      :switchState="switchState"
      :updateLevel="updateLevel"
    />

  </div>
</template>

<script>
//components
import QuestionCard from './QuestionCard'

export default {
  name: 'Questions',

  components: {
    QuestionCard,
  },

  props: {
    questions: [Array, Object],
    userId: String,
    state: String,
    switchState: Function,
    fetchRecentQuestions: Function,
    updateLevel: Function,
  },
}
</script>

<style>
</style>


