<template>
  <div class="form">
      <p for="title">insert title:</p>
      <input v-model="title" class="title">

      <p>insert text:</p>
      <textarea v-model="text" rows="12" class="texty"></textarea> 

      <p>insert tag:</p>
      <input v-model="tag" class="tag">

    <div class="button">
      <button @click="sendQuestionToDB()" type="submit" class="done">
        Done
      </button>
      <button @click="switchState('questionsMode')" type="submit" class="back">
        back
      </button>
    </div>  
  </div>  
</template>

<script>
//helper
import bus from '../helper/function/bus'

export default {
  name: 'QuestionForm',

  props: {
    addQuestion: Function,
    switchState: Function,
  },

  data() {
    return {
      title: '',
      text: '',
      tag: '',
    }
  },

  methods: {
    sendQuestionToDB() {
      const valid = this.title == '' || this.text == '' ? false : true
      if (!valid) bus.$emit('show-message', 'please fill all requirements ...')
      else {
        const newDate = new Date()
        const date =
          newDate.getFullYear() +
          '/' +
          (newDate.getMonth() + 1) +
          '/' +
          newDate.getDate()

        this.addQuestion(
          {
            title: this.title,
            text: this.text,
            tag: this.tag,
          },
          date,
        )
        this.switchState('questionsMode')
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
}

.tag {
  margin-bottom: 50px;
  padding: 8px;
  width: 50%;
}

.texty {
  margin-bottom: 20px;
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