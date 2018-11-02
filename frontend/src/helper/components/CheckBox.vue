<template>
  <div @click="$emit('click')">
    <i v-if="selected">done</i>
    <i v-if="!selected">fingerprint</i>
  </div>
</template>

<script>
export default {
  props: {
    selected: Boolean,
  },
}
</script>

<style>
</style>


