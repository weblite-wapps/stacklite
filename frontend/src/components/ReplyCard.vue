<template>
  <div class="replyCard">
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

<style scoped>
.replyCard {
  width: 230px;
  min-height: 40px;
  background: #f3f3f3;
  border: 1.5px black solid;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 20px;
  padding: 3px;
}
</style>


