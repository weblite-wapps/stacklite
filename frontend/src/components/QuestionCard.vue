<template>
  <div>
    <button type="submit">
      share
    </button>
    <button @click="addToFavorite" type="submit">
      favorite
    </button>
  </div>  
</template>

<script>
export default {
  name: 'QuestionCard',

  data() {
    return {
      title: '',
      text: '',
      favorit: false,
      level: 0,
      author: '',
      tag: '',
    }
  },
}
</script>

