<template>
  <div>
    <textarea v-model="text" placeholder="your reply is ..."></textarea>
    <button @click="checkAndSaveReply()" type='submit'>
      submit
    </button>
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

<style>
</style>


