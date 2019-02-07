<template>
  <div>
    <p @click="searchTag()" class="tag">{{tag}}</p>
  </div>
</template>

<script>
//helper
import bus from '../function/bus'

export default {
  props: {
    tag: String,
  },

  methods: {
    searchTag() {
      bus.$emit('search-tag', this.tag)
    },
  },
}
</script>

<style>
.tag {
  color: #3b341e;
  border: 1px #2f1e22 solid;
  border-radius: 3px;
  padding-left: 2px;
  padding-right: 2px;
  font-size: 0.8em;
  font-family: sans-serif;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>


