<template>
  <div class="replyForm">
    <textarea v-model="text" placeholder="your reply is ..." maxlength="300" class="textForm"></textarea>
    <i @click="checkAndSaveReply()" type="submit" class="sub">note_add</i>
  </div>
</template>

<script>
//helper
import bus from '../../helper/function/bus'

export default {
  props: {
    answerId: String,
    storeReply: Function,
    toggleReplyPermission: Function,
    addReply: Function,
    allReplys: Function,
  },

  data() {
    return {
      text: '',
    }
  },

  methods: {
    checkAndSaveReply() {
      const { text } = this
      if (text === '')
        bus.$emit('show-message', 'empty reply does not allowed ...')
      else {
        this.storeReply(this.answerId, text)
        this.addReply(text)
        this.clear()
        this.toggleReplyPermission()
        this.allReplys()
      }
    },

    clear() {
      this.text = ''
    },
  },
}
</script>

<style scoped>
.replyForm {
  margin-bottom: 10px;
}

.textForm {
  width: 230px;
  height: 40px;
  background: #f3f3f3;
  border: 1.5px black solid;
  border-radius: 5px;
  text-align: center;
  line-height: 20px;
  padding: 3px;
  font-size: 19px;
  font-family: sans-serif;
}
.textForm:focus {
  outline: none;
}

.sub {
  position: relative;
  bottom: 15px;
  left: 10px;
}
</style>


