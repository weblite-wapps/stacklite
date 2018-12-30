<template>
  <div class="form">
    <p for="title">insert title:</p>
    <input v-model="title" class="title" maxlength="20">

    <p>insert text:</p>
    <textarea v-model="text" rows="12" class="texty" maxlength="700"></textarea>

    <p>insert tag:</p>
    <textarea v-model="tag" class="tag" maxlength="25"></textarea>

    <div class="button">
      <button @click="sendQuestion" type="submit" class="done">Done</button>
      <button @click="switchState('questions')" type="submit" class="back">back</button>
    </div>
  </div>
</template>

<script>
// modules
import { mapState, mapMutations, mapActions } from 'vuex'

//helper
import bus from '../../helper/function/bus'

export default {
  name: 'QuestionForm',

  data() {
    return {
      title: '',
      text: '',
      tag: '',
    }
  },

  computed: mapState(['state']),

  methods: {
    ...mapMutations(['switchState']),
    ...mapActions(['addQuestion']),

    sendQuestion() {
      const valid =
        R.trim(this.title) === '' || R.trim(this.text) === '' ? false : true
      if (!valid) bus.$emit('show-message', 'please fill all requirements ...')
      else {
        this.addQuestion({
          title: this.title,
          text: this.text,
          tag: this.tag,
        })
      }
    },
  },
}
</script>

<style scoped>
.form {
  position: relative;
  width: 100%;
  display: flex;
  width: 80%;
  flex-direction: column;
  left: 60px;
  top: 40px;
}

.title {
  margin-bottom: 20px;
  padding: 8px;
  width: 50%;
  box-sizing: border-box;
  font-size: 20px;
  font-family: sans-serif;
}

.tag {
  margin-bottom: 50px;
  padding: 8px;
  width: 50%;
  font-size: 20px;
  font-family: sans-serif;
}

.texty {
  margin-bottom: 20px;
  font-size: 20px;
  font-family: sans-serif;
}

.button {
  display: flex;
  flex-direction: row;
}
.done {
  width: 30%;
  margin-left: 100px;
  margin-right: 30px;
}

.back {
  width: 30%;
}

button,
textarea,
input {
  background-color: #e3e3e3;
  border: 3px #191939 solid;
  border-radius: 5px;
}

input:focus,
textarea:focus,
button:focus {
  outline: none;
  border: 3px #993322 solid;
}

button:hover {
  cursor: pointer;
}
</style>