<template>
  <div>
    <button @click="switchState('askingMode')" type="sbmit">
      ask question
    </button>

    <button @click="fetchRecentQuestions()" type="sbmit">
      recent
    </button> 

    <button @click="fetchUserQuestions()" type="sbmit">
      yours
    </button>

    <button @click="fetchUserFavoriteQuestions()" type="sbmit">
      favorites
    </button>

    <QuestionCard 
      v-for="(q) in reverseQuestions"
      :key="q._id"
      :question="q"
      :userId="userId"
      :state="state"
      :switchState="switchState"
      :updateLevel="updateLevel"
      :addToFavorite="addToFavorite"
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
    fetchUserQuestions: Function,
    fetchUserFavoriteQuestions: Function,
    updateLevel: Function,
    addToFavorite: Function,
  },

  computed: {
    reverseQuestions() {
      return R.reverse(this.questions)
    },
  },

  mounted: function() {
    this.fetchRecentQuestions()
  },
}
</script>

<style>
</style>


