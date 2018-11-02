<template>
  <div align="center">
    <p> title: {{question.title}}</p>
    <p> text: {{question.text}}</p>
    <p> tag: {{question.tag}}</p>
    <p> author: {{question.authorName}}</p>
    <p> level: {{level}}</p>
    <p> date: {{question.date}}</p>
    <button @click="share()" type="submit">
      share
    </button>
    <button @click="changeFavorite()" type="submit">
      favorite
    </button>
    <button @click="changeLevel(1)" type="submit">
      upLevel
    </button>
    <button @click="changeLevel(-1)" type="submit">
      downLevel
    </button>
    <button @click="goToAnswersMode()" type="submit">
      answers
    </button>
    {{favorite}}
    <br>
    <br>
    <br>
  </div>  
</template>

<script>
//helper
import bus from '../helper/function/bus'
export default {
  name: 'QuestionCard',

  props: {
    question: Object,
    userId: String,
    updateLevel: Function,
    addToFavorite: Function,
    removeFromFavorite: Function,
  },

  data() {
    return {
      level: 0,
      favorite: false,
    }
  },

  methods: {
    share() {},

    goToAnswersMode() {
      bus.$emit('answers-mode', this.question)
    },

    changeFavorite() {
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

  watch: {
    question: function() {
      this.level = this.question.level
      this.favorite =
        R.indexOf(this.userId, this.question.favorite) === -1 ? false : true
    },
  },

  mounted() {
    this.level = this.question.level
    this.favorite =
      R.indexOf(this.userId, this.question.favorite) === -1 ? false : true
  },
}
</script>

<style>
</style>

