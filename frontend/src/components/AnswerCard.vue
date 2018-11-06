<template>
  <div align="center">
    <br>
    <br>
    <br>

    <p> answer text: {{answer.text}} <p/>
    <p> author: {{answer.authorName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; level: {{level}}<p/>
    
    <CheckBox
    :isWriter="isWriter"
    @click="changeChosen()"
    :selected="chosen"
    />

    <button @click="changeLevel(1)" type="submit">
      upLevel
    </button>
    <button @click="changeLevel(-1)" type="submit">
      downLevel
    </button>
    <button @click="showHideReplys()" type="submit">
      all replys
    </button>
    <button @click="toggleReplyPermission()" type="submit">
      reply
    </button>

    <ReplyForm
    v-show="replyPermission === true"
    :answerId="answer._id"
    :storeReply="storeReply"
    :toggleReplyPermission="toggleReplyPermission"
    />

    <ReplyCard
      v-for="(reply, i) in answer.replys"
      v-if="showReplysPermission === true"
      :key="i"
      :reply="reply"
    />

  </div>
</template>

<script>
//components
import ReplyForm from './ReplyForm'
import ReplyCard from './ReplyCard'
import CheckBox from '../helper/components/CheckBox'

export default {
  components: {
    ReplyForm,
    ReplyCard,
    CheckBox,
  },

  data() {
    return {
      level: -100,
      replyPermission: false,
      showReplysPermission: false,
      chosen: false,
    }
  },

  props: {
    answer: Object,
    userId: String,
    questionWriter: String,
    updateAnswerLevel: Function,
    storeReply: Function,
    state: String,
    toggleChosen: Function,
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

    toggleReplyPermission() {
      this.replyPermission = !this.replyPermission
    },

    showHideReplys() {
      this.showReplysPermission = !this.showReplysPermission
    },

    changeChosen() {
      if (this.isWriter) {
        this.chosen = !this.chosen
        this.toggleChosen(this.answer._id, this.chosen)
      }
    },
  },

  computed: {
    isWriter() {
      return this.userId === this.questionWriter ? true : false
    },
  },

  watch: {
    answer: function() {
      this.level = this.answer.level
      this.chosen = this.answer.chosen
    },

    state: function() {
      this.showReplysPermission = false
      this.replyPermission = false
    },
  },

  mounted: function() {
    this.level = this.answer.level
    this.chosen = this.answer.chosen
  },
}
</script>

<style>
</style>


