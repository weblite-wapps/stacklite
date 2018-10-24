<template>
  <div>
    <button @click="switchState('askingMode')" type="sbmit">
      ask question
    </button> 
    {{questions}}
  </div>
</template>

<script>
export default {
  name: 'Questions',

  props: {
    questions: [Array, Object],
    switchState: Function,
  },
}
</script>

<style>
</style>


