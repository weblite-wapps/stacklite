<template>
  <div>
    <textarea v-model="text" placeholder="your answer is ..." class="ansForm"></textarea>
    <i @click="checkAndSaveAnswer()" class="submitAns">
      add_circle_outline
    </i>
  </div>
</template>

<script>
//helper
import bus from '../../helper/function/bus'

export default {
  data() {
    return {
      text: '',
    }
  },

  props: {
    storeAnswer: Function,
    switchState: Function,
  },

  methods: {
    checkAndSaveAnswer() {
      const { text } = this
      if (text === '')
        bus.$emit('show-message', 'please fill all requirements ...')
      else {
        const newDate = new Date()
        const date =
          newDate.getFullYear() +
          '/' +
          (newDate.getMonth() + 1) +
          '/' +
          newDate.getDate()
        this.storeAnswer(text, date)
        this.switchState('questionsMode')
        this.clear()
      }
    },

    clear() {
      this.text = ''
    },
  },
}
</script>

<style>
.ansForm::placeholder {
  font-family: sans-serif;
  font-size: 1.2em;
  color: black;
}

.ansForm:focus {
  outline: none;
}

.ansForm {
  width: 250px;
  height: 80px;
  border: 8px #2e2333de solid;
  border-radius: 15px;
  background: #9875a3;
  position: relative;
  left: 200px;
  bottom: 30px;
}

.submitAns {
  position: relative;
  left: 212px;
  bottom: 50px;
  font-size: 50px;
  color: #4b3568;
}
</style>


