<template>
  <div>
    <input v-model="title" placeholder="insert title">
    <textarea v-model="text" placeholder="text: ..."></textarea> 
    <input v-model="tag" placeholder="insert tag">
    <button @click="sendQuestionToDB" type="submit">
      Done
    </button>
  </div>  
</template>

<script>
export default {
  name: 'QuestionForm',

  props: {
    addQuestion: Function,
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
      this.addQuestion({ title: this.title, text: this.text, tag: this.tag })
    },
  },
}
</script>

<style>
</style>