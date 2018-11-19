<template>
  <div class="replyForm">
    <textarea v-model="text" placeholder="your reply is ..." class="textForm"></textarea>
    <i @click="checkAndSaveReply()" type='submit' class="sub">
      create
    </i>
  </div>
</template>

<script>
//helper
import bus from '../helper/function/bus'

export default {
  data() {
    return {
      text: '',
    }
  },

  props: {
    answerId: String,
    storeReply: Function,
    toggleReplyPermission: Function,
  },

  methods: {
    checkAndSaveReply() {
      const { text } = this
      if (text === '')
        bus.$emit('show-message', 'please fill all requirements ...')
      else {
        this.storeReply(this.answerId, text)
        this.clear()
        this.toggleReplyPermission()
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


