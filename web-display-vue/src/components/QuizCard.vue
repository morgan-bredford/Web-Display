<template>
  <div id="card">
    <h1 class="bottom_margin">{{question.category}}</h1>
    <h2 class="bottom_margin" v-html="question.question"></h2>
    <p  id="ts_right_or_wrong" :class="[currentAnswer ? 'right' : 'wrong']" :style="{'visibility' : answered ? 'visible' : 'hidden'}"></p>
    <div id="ts_answers" >
    <button class="answer" v-for="answer in randomQuestionsArray" :key="answer" v-html="answer" @click="e => this.$emit('check-answer', e.target, answer)"></button>
    </div>
  </div>

</template>

<script lang="ts">
  // import { Question } from './Quiz.vue'
  import '../css/main.css'

  // type Props = {
  //   question: Question;
  //   randomQuestionsArray: string[];
  // }

  export default {
    name: 'QuizCard',
    //props: {questions: {type: Object as () => Ref<Question[]>}},
    props: ['question','randomQuestionsArray','currentAnswer','answered'],
    setup() {
      // const msg: string | number  = 'quiz'
      // const msg2  = 3
      //console.log(props)

      // onMounted(() => {
      //   console.log(props)
      // })

      //return {showProps}
    }
    // setup (props) {
    //   console.log(props.questions[0])
    // }
  }
</script>

<style>
  .formcontainer {
    text-align: center;
  }
  button {
    display: block;
    margin: auto;
    margin-bottom: .4em;
    color: var(--lightgreen);
  }
  button:hover {
    color: var(--darkblue);
  }
  #card {
    color: var(--lightgreen);
  }
  #ts_right_or_wrong {
    height: 2vh;
    margin: 1vh auto;
  }
  #ts_answers {
    text-align: center;
  }
  .hidden {
    visibility: hidden;
  }
  .bottom_margin {
    margin-bottom: 1vh;
  }
</style>