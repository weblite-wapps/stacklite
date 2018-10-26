<template>
  <div>
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
    addFavorite() {
      this.favorite
        ? this.removeFromFavorite(this.question._id)
        : this.addToFavorite(this.question._id)
      this.favorite = !this.favorite
    },
    share() {},

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
/* .root {
  margin-bottom: 8px;
  background: #ffffff;
  box-shadow: 0px 1px 7px -1px rgba(80, 80, 80, 0.37);
  padding: 10px 15px;
  cursor: pointer;
}

.title {
  color: #6b6b6b;
  font-size: 19px;
  margin: 7px 0px 13px;
}

.req-text {
  color: rgba(211, 18, 18, 0.514);
  font-size: 14px;
}

.answer {
  color: #6b6b6be8;
  font-size: 15px;
} */
</style>

