<template>
  <div>

  </div>
</template>


<script>
// components

// helper
import webliteHandler from "./helper/function/weblite.api"
import requests from "./helper/function/handleRequests"
import bus from "./helper/function/bus"
// R && W
const { R, W } = window

export default {
  name: "App",

  components: {},

  data() {
    return {}
  },

  created() {
    W && webliteHandler(this)
  },

  methods: {
    // fetchData() {
    //   if (this.creator) {
    //     requests.getAllAnswers(this.wisId).then(res => {
    //       this.peopleData = res
    //       switchState('reviewing')
    //     })
    //   } else {
    //     requests.getUserAnswers(this.userId, this.wisId).then(res => {
    //       if (R.prop('found', res)) {
    //         this.fillMyData(res.answers)
    //       } else {
    //         this.answers = R.map(
    //           ({ type }) => (type === 'checkbox' ? [] : ''),
    //           this.questions,
    //         )
    //         switchState('answering')
    //       }
    //     })
    //   }
    // },
    // submit() {
    //   const valid = this.questions.reduce((acc, { required, type }, i) => {
    //     if (
    //       (required &&
    //         (type == 'radio' || type == 'text') &&
    //         this.answers[i] == '') ||
    //       (type == 'checkbox' && this.answers[i].length == 0)
    //     )
    //       return false
    //     return acc
    //   }, true)
    //   if (!valid)
    //     bus.$emit('show-message', 'please answer all the requirements ...')
    //   else {
    //     requests
    //       .postAnswers(this.name, this.userId, this.wisId, this.answers)
    //       .then(() => {
    //         this.fillMyData()
    //         switchState('reviewing')
    //         bus.$emit('show-message', 'Submitted ...')
    //       })
    //   }
    // },
  }
}
</script>


<style scoped>
.root {
  position: relative;
  width: 350px;
  min-height: 450px;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  border: 1px #e0e0e0 solid;
  border-radius: 5px;
  overflow: hidden;
  background: #f0f0f098;
}
</style>
