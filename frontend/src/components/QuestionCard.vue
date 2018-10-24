<template>
  <div>
    <p> title: {{question.title}}</p>
    <p> text: {{question.text}}</p>
    <p> tag: {{question.tag}}</p>
    <p> author: {{question.authorName}}</p>
    <p> level: {{level}}</p>
    <button @click="share()" type="submit">
      share
    </button>
    <button @click="addToFavorite()" type="submit">
      favorite
    </button>
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
  name: 'QuestionCard',

  props: {
    question: Object,
    userId: String,
    state: String,
    switchState: Function,
    updateLevel: Function,
  },

  data() {
    return {
      title: '',
      text: '',
      level: 0,
      authorName: '',
      tag: '',
      date: '',
      answers: 0,
      voters: [],
    }
  },

  created: function() {
    const {
      title,
      text,
      tag,
      level,
      authorName,
      date,
      answers,
      voters,
    } = this.question
    //   this.title = title
    //   this.text = text
    //   this.tag = tag
    this.level = level
    //   this.authorName = authorName
    //   this.date = date
    //   this.answers = answers
    //   this.voters = voters
  },

  methods: {
    addToFavorite() {},

    share() {},

    changeLevel(score) {
      const { question } = this
      if (R.indexOf(this.userId, question.voters) === -1) {
        this.updateLevel(score, this.userId, question._id)
        this.level += score
      }
    },
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

