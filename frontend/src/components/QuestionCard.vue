<template>
  <div @click="goToAnswersMode()">
    <p> type: {{question._id}}</P>
    <p> title: {{question.title}}</p>
    <p> text: {{question.text}}</p>
    <p> tag: {{question.tag}}</p>
    <p> author: {{question.authorName}}</p>
    <p> level: {{level}}</p>
    <p> date: {{question.date}}</p>
    <button @click="share()" type="submit">
      share
    </button>
    <button @click="addFavorite()" type="submit">
      favorite
    </button>
    <button @click="changeLevel(1)" type="submit">
      upLevel
    </button>
    <button @click="changeLevel(-1)" type="submit">
      downLevel
    </button>
    {{favorite}}
  </div>  
</template>

<script>
export default {
  name: 'QuestionCard',

  props: {
    question: Object,
    userId: String,
    state: String,
    switchState: Function,
    updateLevel: Function,
    addToFavorite: Function,
    removeFromFavorite: Function,
  },

  data() {
    return {
      level: -100,
      favorite: false,
    }
  },

  methods: {
    share() {},

    goToAnswersMode() {
      bus.$emit('answers-mode', {
        id: this.question._id,
        title: this.question.title,
      })
    },

    addFavorite() {
      this.favorite
        ? this.removeFromFavorite(this.question._id)
        : this.addToFavorite(this.question._id)
      this.favorite = !this.favorite
    },

    changeLevel(score) {
      const { question } = this
      if (
        R.indexOf(this.userId, question.voters) === -1 &&
        this.level === question.level
      ) {
        this.updateLevel(score, question._id)
        this.level += score
      }
    },
  },

  mounted: function() {
    this.level = this.question.level
    this.favorite =
      R.indexOf(this.userId, this.question.favorite) === -1 ? false : true
  },
}
</script>

<style>
</style>

