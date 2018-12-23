<template>
  <div class="card">
    <h1>{{question.title}}</h1>

    <div class="makeInRow">
      <div class="makeIncolumn">
        <button @click="share()" type="submit" class="share">share</button>
        <i @click="changeLevel(1)" type="submit" class="upLevel">arrow_drop_up</i>
        <h2>{{level}}</h2>
        <i @click="changeLevel(-1)" type="submit" class="downLevel">arrow_drop_down</i>
      </div>

      <i v-if="favorite" @click="changeFavorite()" type="submit" class="favorite">star_border</i>
      <i v-if="!favorite" @click="changeFavorite()" type="submit" class="notFavorite">star_border</i>
      
      <i
        v-if="userId === question.authorId"
        @click="deleteQuestion(question._id)"
        type="submit"
        class="delete"
      >delete</i>
      
      <i v-if="question.solved" class="Done">done_outline</i>
    </div>

    <pre class="text">{{question.text}}</pre>

    <div class="footer">
      <div class="tags">
        <TagShow v-for="(tag) in tags" :key="tag._id" :tag="tag"/>
      </div>
      <p class="footerItem">Author: {{question.authorName}}</p>
      <p class="footerItem">Date: {{formattedDate}}</p>
      <button @click="goToAnswersMode()" type="submit" class="answers">answers</button>
      <p class="ansNumber">{{numberOfAnswers}}</p>
    </div>
  </div>
</template>

<script>
//helper
import bus from '../../helper/function/bus'
import TagShow from '../../helper/components/TagShow'

export default {
  name: 'QuestionCard',

  components: { TagShow },

  props: {
    question: Object,
    userId: String,
    updateLevel: Function,
    updateLevelAgain: Function,
    changeUserFavorite: Function,
    deleteQuestion: Function,
  },

  data() {
    return {
      level: 0,
      favorite: false,
      numberOfAnswers: 0,
      formattedDate: '',
      tags: [],
    }
  },

  methods: {
    share() {},

    goToAnswersMode() {
      bus.$emit('answers-mode', this.question)
    },

    changeFavorite() {
      this.favorite
        ? this.changeUserFavorite(this.question._id, 'remove')
        : this.changeUserFavorite(this.question._id, 'add')
      this.favorite = !this.favorite
    },

    changeLevel(score) {
      const { question } = this
      if (
        this.userId !== question.authorId &&
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
      const { question } = this
      this.level = question.level
      this.numberOfAnswers = question.answers
      this.favorite =
        R.indexOf(this.userId, question.favorite) === -1 ? false : true
    },
  },

  mounted() {
    const { question } = this
    this.level = question.level
    this.numberOfAnswers = question.answers
    this.favorite =
      R.indexOf(this.userId, question.favorite) === -1 ? false : true
    const date = new Date(this.question.date)
    this.formattedDate =
      date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    this.tags = R.split(' ', R.replace(/\n/g, ' ', this.question.tag))
  },
}
</script>

<style>
.Done {
  position: relative;
  right: 115px;
  top: 125px;
  font-size: 42px;
  font-weight: bold;
  color: rgb(65, 97, 65);
  max-width: 0px;
  cursor: default;
}
.delete {
  position: relative;
  max-height: 0px;
  left: 415px;
  top: 80px;
}

.card {
  position: static;
  background-color: #e3e3e3;
  border: 2px black solid;
  border-radius: 4px;
  margin-bottom: 30px;
  width: 600px;
  height: 270px;
  align-self: center;
}

h1 {
  position: relative;
  text-align: center;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 1.3em;
  top: 15px;
}

h2 {
  position: relative;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 1.3em;
  bottom: 15px;
}

.share {
  background-color: #e3e3e3;
  border: 2px #991939 solid;
  border-radius: 25px;
  font-size: 1.2em;
  cursor: pointer;
  width: 70px;
}

.makeIncolumn {
  display: flex;
  flex-direction: column;
  width: 80px;
  align-items: center;
}

.makeInRow {
  display: flex;
  flex-direction: row;
}

.favorite {
  font-size: 50px;
  max-height: 0px;
  color: #ffff44;
  position: relative;
  left: 450px;
}

.notFavorite {
  font-size: 50px;
  max-height: 0px;
  color: #fff;
  position: relative;
  left: 450px;
}

.upLevel {
  font-size: 50px;
  position: relative;
}

.downLevel {
  font-size: 50px;
  position: relative;
  bottom: 27px;
}

.text {
  background: #e3e3e3;
  width: 60%;
  height: 140px;
  margin: auto;
  position: relative;
  bottom: 105px;
  font-size: 1.2em;
  letter-spacing: 1.2px;
  font-family: sans-serif;
  line-height: 22px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  overflow-wrap: break-word;
}

.footer {
  display: flex;
  flex-direction: row;
  position: relative;
  bottom: 70px;
  margin-left: 1 5px;
}

.footerItem {
  margin-right: 30px;
  font-size: 1.1em;
  font-family: sans-serif;
  font-weight: bold;
}

.tags {
  display: flex;
  flex-direction: column;
  position: relative;
  left: 10px;
  bottom: 25px;
  margin-right: 25px;
}

.answers {
  background-color: #e3e3e3;
  border: 2px #991939 solid;
  border-radius: 25px;
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  right: 30px;
  bottom: 15px;
}

.ansNumber {
  font-size: 1.2em;
  font-family: sans-serif;
  font-weight: bold;
  position: absolute;
  right: 60px;
  top: 10px;
}

.share:focus,
.answers:focus {
  outline: none;
}
</style>