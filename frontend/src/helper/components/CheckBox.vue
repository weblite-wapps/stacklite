<template>
  <div @click="$emit('click')">
    <i class="checkBox">{{icon}}</i>
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
        if (this.selected) return 'check_box'
        else return 'check_box_outline_blank'
      } else {
        if (this.selected) return 'check_box'
        else return ''
      }
    },
  },
}
</script>

<style scoped>
.checkBox {
  position: absolute;
  top: 30px;
  left: -45px;
  font-size: 40px;
}
</style>


