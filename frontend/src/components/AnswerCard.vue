<template>
  <div>
    <p> answer text: {{answer.text}} <p/>
    <p> author: {{answer.authorName}} <p/>
    <p> level: {{level}} <p/>
    <button @click="changeLevel(1)" type="submit">
      upLevel
    </button>
    <button @click="changeLevel(-1)" type="submit">
      downLevel
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      level: -100,
    }
  },

  props: {
    answer: Object,
    userId: String,
    updateAnswerLevel: Function,
  },

  methods: {
    changeLevel(score) {
      const { answer } = this
      if (
        R.indexOf(this.userId, answer.voters) === -1 &&
        this.level === answer.level
      ) {
        this.updateAnswerLevel(score, answer._id)
        this.level += score
      }
    },
  },

  mounted: function() {
    this.level = this.answer.level
  },
}
</script>

<style>
</style>


