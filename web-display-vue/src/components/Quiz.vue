<template>
  <div class="formcontainer">
    <div id="results" v-if="!active && activeQuestion > 0">
      <br />
      <h2>Resultat:</h2>
      <br />
      <p>Du fick {{numOfCorrectAnswers}} rätt av {{numOfQuestions}} möjliga</p>
      <br />
      <hr>
       <br />
      <h3>Spela igen</h3>
    </div>
    <div>
      <form v-if="!active" @submit.prevent="e => startGame(e)">
        <label for="num_of_questions">Antal frågor:</label>
        <select name="num_of_questions" v-model="numOfQuestions">
          <option :value="NUMBER_OF_QUESTIONS.FIVE">5</option>
          <option :value="NUMBER_OF_QUESTIONS.TEN">10</option>
          <option :value="NUMBER_OF_QUESTIONS.FIFTHTEEN">15</option>
        </select>
        <label for="difficulty">Svårighetsgrad:</label>
        <select name="difficulty" v-model="difficulty">
          <option :value="DIFFICULTY.ANY">Blandat</option>
          <option :value="DIFFICULTY.EASY">Lätt</option>
          <option :value="DIFFICULTY.MEDIUM">Medium</option>
          <option :value="DIFFICULTY.HARD">Svårt</option>
        </select>
        <button>Start</button>
      </form>
      <br /><br />
      <div v-if="active" id="stats">Fråga: {{activeQuestion + 1}}/{{numOfQuestions}} | Antal rätt: {{numOfCorrectAnswers}}</div>
      <QuizCard v-if="active" 
        :question="question" 
        :randomQuestionsArray="randomQuestionsArray" 
        @check-answer="checkAnswer" 
        :currentAnswer="currentAnswer"
        :answered="answered"
      />
      <button id="next_button" v-if="active && answered && activeQuestion + 1 < numOfQuestions" @click="nextQuestion()">Nästa</button>
      <button id="results_button" v-if="active && answered && activeQuestion + 1 == numOfQuestions" @click="showResult()">Resultat</button>
    </div>
  </div>
</template>

<script lang="ts">
  import QuizCard from './QuizCard.vue';
  import { ref } from 'vue'
  import { NUMBER_OF_QUESTIONS, DIFFICULTY, getQuestions } from '../api'
  import '../css/main.css'

  export type Question = {
      category: string;
      correct_answer: string;
      difficulty: string;
      incorrect_answers: string[];
      question: string;
      type: string;
  }

  export const shuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5)

  export default {
    name: 'Quiz',
    components: {
      QuizCard
    },
    // props: {
    //   'tstr': String
    // },
    setup() {
      const questions = ref<Question[]>([])
      const question = ref<Question>({} as Question)
      const active = ref<boolean>(false)
      const activeQuestion = ref<number>(0)
      const randomQuestionsArray = ref<string[]>([])
      const difficulty = ref<DIFFICULTY>(DIFFICULTY.EASY)
      const numOfQuestions = ref<NUMBER_OF_QUESTIONS>(5)
      const numOfCorrectAnswers = ref<number>(0)
      const answered = ref<boolean>(false)
      const currentAnswer = ref<boolean>(true)

      // const tstr = computed({ 
      //   get: () => props.tstr, 
      //   set: (value) => emit('update:tstr', value) 
      // }) 
      // const question = ref<Question>({
      // category: 'string',
      // correctAnswer: 'string',
      // difficulty: 'string',
      // incorrectAnswers: ['string'],
      // question: 'string',
      // type: 'string'
      // })

      // onMounted( () =>  console.log(questions))
      // onUpdated( () => console.log(questions))

      const startGame = async () => {
        activeQuestion.value = 0
        numOfCorrectAnswers.value = 0
        questions.value = await getQuestions(numOfQuestions.value, difficulty.value)
        question.value = (questions.value[activeQuestion.value] as Question)
        randomQuestionsArray.value = shuffleArray([...question.value.incorrect_answers, question.value.correct_answer])
        active.value = true
        console.log(active)
      }

      const nextQuestion = () => {
        activeQuestion.value = activeQuestion.value + 1
        question.value = (questions.value[activeQuestion.value] as Question)
        randomQuestionsArray.value = shuffleArray([...question.value.incorrect_answers, question.value.correct_answer])
        //document.getElementById("ts_right_or_wrong")!.classList.remove("visible")
        answered.value = false
      }

      const checkAnswer = (e: HTMLElement, answer: string) => {
        console.log(e)
        //e.style.backgroundColor = 'red'
        if(!answered.value){
          if(answer == questions.value[activeQuestion.value].correct_answer){
            currentAnswer.value = true
            numOfCorrectAnswers.value = numOfCorrectAnswers.value + 1
            document.getElementById('ts_right_or_wrong')!.innerHTML = 'Rätt!'
            e.classList.add('right')
            answered.value = true
          }else{
            currentAnswer.value = false
            console.log('wrong')
            e.classList.add("wrong")
            document.getElementById("ts_right_or_wrong")!.innerHTML = `Korrekt svar: ${questions.value[activeQuestion.value].correct_answer}`
            answered.value = true
            const child_nodes: (NodeListOf<ChildNode>) = document.getElementById('ts_answers')!.childNodes
            for(let i=1;i<child_nodes.length-1;i++){
              const node = child_nodes[i] as HTMLDivElement
              if(node.innerHTML === questions.value[activeQuestion.value].correct_answer) {
                node.style.backgroundColor = 'green'
              }
            }
          }
        }
      }

      const showResult = () => {
        active.value = false
        answered.value = false
      }

      return {
        questions, 
        question, 
        startGame, 
        active, 
        activeQuestion, 
        nextQuestion, 
        randomQuestionsArray, 
        numOfQuestions, 
        difficulty, 
        DIFFICULTY, 
        NUMBER_OF_QUESTIONS,
        checkAnswer,
        numOfCorrectAnswers,
        answered,
        showResult,
        currentAnswer
      }
    },
  }
</script>

<style>
#results {
  color: var(--lightgreen);
  text-align: center;
}
#stats {
  color: var(--lightgreen)
}
#next_button {
  color: var(--darkblue);
  background-color: var(--lightgreen);
}
#results_button {
  color: var(--darkblue);
  background-color: var(--lightgreen);
}
.visible {
  visibility: visible !important;
}
.right {
  background-color: green;
}
.wrong {
  background-color: red;
}
</style>
