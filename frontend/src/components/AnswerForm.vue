<template>
  <div>
    <textarea v-model="text" placeholder="your answer is ..."></textarea>
    <button @click="storeAnswer(text)" type='submit'>
      submit
    <button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },

  props: {
    storeAnswer: Function,
  },
}
</script>

<style>
</style>


