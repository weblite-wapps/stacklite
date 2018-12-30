<template>
  <div :class="$style.root">
    <span :class="$style.title">{{ appName }}</span>
    <i v-if="icon=='description'" @click="showSigniture()" :class="$style['form-icon']">description</i>
    <i v-if="icon=='back'" @click="backToQuestions()" :class="$style['form-icon']">backspace</i>

    <div v-if="icon=='back'" :class="$style.signiture">
      {{wappName}}
      <br>
      <br>
      <br>
      developer: {{developer}}
      <br>
      <br>
      <br>
      designer: {{designer}}
      <br>
      <br>
      <br>
      {{date}}
    </div>
  </div>
</template>


<script>
export default {
  name: 'Header',

  props: {
    appName: String,
    switchState: Function,
  },

  data() {
    return {
      wappName: 'StackOverFlow',
      developer: 'Armin Saadat',
      designer: 'Farzin Pezeshki',
      date: 'December 2018',
      icon: 'description',
    }
  },

  methods: {
    showSigniture() {
      this.switchState('signiture')
      this.icon = 'back'
    },

    backToQuestions() {
      this.switchState('questionsMode')
      this.icon = 'description'
    },
  },
}
</script>


<style module>
.root {
  width: 100%;
  min-height: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #522c7e;
}

.title {
  margin-left: 20px;
  font-size: 22px;
  color: white;
}

.form-icon {
  cursor: pointer;
  margin-right: 20px;
  color: white;
}

.signiture {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 300px;
  left: 150px;
  font-family: sans-serif;
  font-size: 2.5em;
}
</style>
