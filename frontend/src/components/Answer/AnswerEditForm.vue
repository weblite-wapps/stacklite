<template>
  <div>
    <i @click="edit()" type="submit" class="doneEdit">done</i>
    <textarea v-model="editedText" placeholder="can't left empty" maxlength="800" class="editText"></textarea>
  </div>
</template>

<script>
//helper
import bus from '../../helper/function/bus'
import { object } from 'prop-types'

export default {
  props: {
    answer: Object,
    toggleEditState: Function,
  },

  data() {
    return {
      editedText: '',
    }
  },

  mounted: function() {
    this.editedText = this.answer.text
  },

  methods: {
    edit() {
      if (this.editedText === '')
        bus.$emit(
          'show-message',
          'if you want to left answer text empty, better delete it.',
        )
      else {
        this.$store.dispatch('editAnswer', {
          answerId: this.answer._id,
          editedText: this.editedText,
        })
        this.answer.text = this.editedText
        this.toggleEditState()
      }
    },
  },
}
</script>

<style>
.doneEdit {
  position: absolute;
  right: -31px;
  top: 20px;
  font-size: 25px;
}

.editText {
  position: absolute;
  top: 15px;
  left: 80px;
  width: 79%;
  min-height: 93px;
  background: #c6c5c7;
  margin-bottom: 30px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  overflow-wrap: break-word;
  line-height: 20px;
  letter-spacing: 1px;
  font-size: 1.2em;
  font-family: sans-serif;
}

textarea:focus {
  outline: none;
}
</style>


