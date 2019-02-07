<template>
  <div class="replyCard">
    <pre class="breakLine"> replyText: {{reply.text}} </pre>
    <p class="replyAuthor">author: {{reply.authorName}}</p>
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
  line-height: 20px;
  padding: 3px;
  overflow-wrap: break-word;
}

.replyAuthor {
  margin-top: 5px;
  font-family: sans-serif;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 12px;
}

.breakLine {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  overflow-wrap: break-word;
  margin-left: 15px;
  margin-right: 12px;
}
</style>


