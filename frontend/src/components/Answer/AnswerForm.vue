<template>
  <div>
    <textarea v-model="text" placeholder="your answer is ..." maxlength="800" class="ansForm"></textarea>
    <i @click="checkAndSaveAnswer()" class="submitAns">add_circle_outline</i>
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
  },

  methods: {
    checkAndSaveAnswer() {
      const { text } = this
      if (R.trim(text) === '')
        bus.$emit('show-message', 'please fill all requirements ...')
      else {
        this.storeAnswer(text)
        this.clean()
      }
    },

    clean() {
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
  border: 8px #221d24de solid;
  border-radius: 15px;
  background: #9c9aa5;
  position: relative;
  left: 200px;
  bottom: 30px;
  font-size: 20px;
  font-family: sans-serif;
}

.submitAns {
  position: relative;
  left: 212px;
  bottom: 50px;
  font-size: 50px;
  color: #4b3568;
}
</style>


