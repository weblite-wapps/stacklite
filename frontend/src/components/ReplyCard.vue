<template>
  <div>
    <br>
    <p> replyText: {{reply.text}} <p/>
    <p> author: {{reply.authorName}} <p/>
  </div>
</template>

<script>
export default {
  props: {
    reply: Object,
  },
}
</script>

<style>
</style>


