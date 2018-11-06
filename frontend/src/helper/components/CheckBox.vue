<template>
  <div @click="$emit('click')">
    <i>{{icon}}</i>
  </div>
</template>

<script>
export default {
  props: {
    isWriter: Boolean,
    selected: Boolean,
  },

  computed: {
    icon() {
      if (this.isWriter) {
        if (this.selected) return 'done'
        else return 'fingerprint'
      } else {
        if (this.selected) return 'done'
        else return ''
      }
    },
  },
}
</script>

<style>
</style>


