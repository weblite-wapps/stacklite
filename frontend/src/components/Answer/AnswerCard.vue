<template>
  <div class="ansCardRoot">
    <div class="row">
      <pre class="ansText"> {{answer.text}} </pre>

      <i
        v-if="userId === answer.authorId"
        @click="deleteAnswer(answer._id)"
        type="submit"
        class="deleteAns"
      >delete_forever</i>
      <i
        v-if="userId === answer.authorId && !isEditState"
        @click="toggleEditState()"
        type="submit"
        class="editAns"
      >border_color</i>
      <AnswerEditForm
        v-if="isEditState"
        :answer="answer"
        :toggleEditState="toggleEditState"
        :editAnswer="editAnswer"
      />

      <CheckBox :isWriter="isWriter" @click="changeChosen()" :selected="chosen"/>
      <i @click="changeLevel(1)" type="submit" class="upLevelAns">arrow_drop_up</i>
      <h2>{{level}}</h2>
      <i @click="changeLevel(-1)" type="submit" class="downLevelAns">arrow_drop_down</i>
    </div>

    <div class="ansCardFooter">
      <p class="writer">Author: {{answer.authorName}}</p>
      <p class="datee">date: {{formattedDate}}</p>
      <button @click="showHideReplys()" type="submit" class="reply">all replys</button>
      <button @click="toggleReplyPermission()" type="submit" class="reply">reply</button>
    </div>

    <div class="replyCards">
      <ReplyForm
        v-show="replyPermission === true"
        :answerId="answer._id"
        :storeReply="storeReply"
        :toggleReplyPermission="toggleReplyPermission"
        :allReplys="allReplys"
        :addReply="addReply"
      />

      <ReplyCard
        v-for="(reply, i) in showReplys"
        v-if="showReplysPermission === true"
        :key="i"
        :reply="reply"
      />
    </div>
  </div>
</template>

<script>
//components
import ReplyForm from '../Reply/ReplyForm'
import ReplyCard from '../Reply/ReplyCard'
import CheckBox from '../../helper/components/CheckBox'
import AnswerEditForm from './AnswerEditForm'

export default {
  components: {
    ReplyForm,
    ReplyCard,
    CheckBox,
    AnswerEditForm,
  },

  data() {
    return {
      level: -100,
      replyPermission: false,
      showReplysPermission: false,
      chosen: false,
      showReplys: [],
      isEditState: false,
      formattedDate: '',
    }
  },

  props: {
    answer: Object,
    userId: String,
    userName: String,
    questionWriter: String,
    updateAnswerLevel: Function,
    storeReply: Function,
    state: String,
    toggleChosen: Function,
    deleteAnswer: Function,
    editAnswer: Function,
  },

  methods: {
    toggleEditState() {
      this.isEditState = !this.isEditState
    },

    changeLevel(score) {
      const { answer } = this
      if (this.level === answer.level && this.userId !== answer.authorId)
        this.updateAnswerLevel(score, answer._id)
          .then(() => (this.level += score))
          .catch(() => (this.level += 0))
    },

    allReplys() {
      this.showReplysPermission = true
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
        this.answer.chosen = this.chosen
        this.toggleChosen(this.answer._id, this.chosen)
      }
    },

    addReply(text) {
      const reply = { text: text, authorName: this.userName }
      this.showReplys = R.append(reply, this.showReplys)
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
      this.showReplys = [...this.answer.replys]
    },

    state: function() {
      this.showReplysPermission = false
      this.replyPermission = false
    },
  },

  mounted: function() {
    this.level = this.answer.level
    this.chosen = this.answer.chosen
    this.showReplys = R.concat([], this.answer.replys)
    const date = new Date(this.answer.date)
    this.formattedDate =
      date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  },
}
</script>

<style scoped>
.deleteAns {
  position: absolute;
  right: -31px;
  top: 52px;
}

.editAns {
  position: absolute;
  right: -29px;
  top: 20px;
  font-size: 20px;
}

.ansCardRoot {
  position: relative;
  left: 20px;
  border: 2px black solid;
  border-radius: 15px;
  width: 80%;
  min-height: 150px;
  margin: auto;
  margin-bottom: 30px;
}

.ansText {
  position: relative;
  top: 15px;
  left: 80px;
  width: 80%;
  min-height: 100px;
  background: #c6c5c734;
  margin-bottom: 30px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  overflow-wrap: break-word;
  line-height: 25px;
  letter-spacing: 1px;
  font-size: 1.2em;
  font-family: sans-serif;
}

.row {
  display: flex;
  flex-direction: row;
}

.upLevelAns {
  position: absolute;
  left: 10px;
  font-size: 50px;
}

h2 {
  position: absolute;
  top: 40px;
  left: 30px;
  font-size: 20px;
}
.downLevelAns {
  position: absolute;
  top: 50px;
  left: 10px;
  font-size: 50px;
}

.ansCardFooter {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
}

.writer {
  margin-right: 35px;
}

.datee {
  margin-right: 90px;
}

.reply {
  border: 2.5px rgb(27, 63, 80) solid;
  border-radius: 5px;
  margin-right: 3px;
}

.reply:focus {
  outline: none;
}

.reply:hover {
  cursor: pointer;
  border: 2.5px #0a132c solid;
}

.replyCards {
  display: flex;
  flex-direction: column;
  width: 55%;
  margin: 0 auto;
  margin-top: 10px;
}
</style>