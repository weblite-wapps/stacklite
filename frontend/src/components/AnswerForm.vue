<template>
  <div>
    <textarea v-model="text" placeholder="your answer is ..."></textarea>
    <button @click="checkAndSaveAnswer()" type='submit'>
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

  prop: {
    switchState: Function,
  },

  methods: {
    checkAndSaveAnswer() {
      const { text } = this
      if (text === '')
        bus.$emit('show-message', 'please fill all requirements ...')
      else {
        this.storeAnswer(text)
        this.switchState('questionsMode')
        this.clear()
      }
    },

    clear() {
      this.text = ''
    },
  },

  props: {
    storeAnswer: Function,
    switchState: Function,
  },
}
</script>

<style>
</style>


