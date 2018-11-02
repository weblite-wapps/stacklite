<template>
  <div align="center">
    <br>
    <input v-model="title" placeholder="insert title">
    <br>
    <textarea v-model="text" placeholder="text: ..."></textarea> 
    <br>
    <input v-model="tag" placeholder="insert tag">
    <br>
    <br>
    <button @click="sendQuestionToDB()" type="submit">
      Done
    </button>
    <button @click="switchState('questionsMode')" type="submit">
      back
    </button>
  </div>  
</template>

<script>
//helper
import bus from '../helper/function/bus'

export default {
  name: 'QuestionForm',

  props: {
    addQuestion: Function,
    switchState: Function,
  },

  data() {
    return {
      title: '',
      text: '',
      tag: '',
    }
  },

  methods: {
    sendQuestionToDB() {
      const valid = this.title == '' || this.text == '' ? false : true
      if (!valid) bus.$emit('show-message', 'please fill all requirements ...')
      else {
        this.addQuestion({ title: this.title, text: this.text, tag: this.tag })
        this.switchState('questionsMode')
      }
    },
  },
}
</script>

<style>
</style>