<template>
  <div align="center">
    <br>
    <br>
    <br>

    <p> answer text: {{answer.text}} <p/>
    <p> author: {{answer.authorName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; level: {{level}}<p/>
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
      v-if="showReplysPermission === true"
      v-for="(reply, i) in answer.replys"
      :key="i"
      :reply="reply"
    />

  </div>
</template>

<script>
//components
import ReplyForm from './ReplyForm'
import ReplyCard from './ReplyCard'

export default {
  components: {
    ReplyForm,
    ReplyCard,
  },

  data() {
    return {
      level: -100,
      replyPermission: false,
      showReplysPermission: false,
    }
  },

  props: {
    answer: Object,
    userId: String,
    updateAnswerLevel: Function,
    storeReply: Function,
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
  },

  watch: {
    answer: function() {
      this.level = this.answer.level
    },
  },

  mounted: function() {
    this.level = this.answer.level
  },
}
</script>

<style>
</style>


