import React, { useCallback, useEffect, useState } from 'react';
import QuestionCmp from './ts-components/QuestionCmp';
import { Difficulty, getQuestions, Number_of_questions } from './tsApi'
import "./tsMain.css"

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export const shuffleArray = (array: string[]) =>
[...array].sort(() => Math.random() - 0.5)

function TsQuiz () {
  const [questions, setQuestions] = useState<Question[]>([
    // {
    // category: 'ph',
    // correct_answer: 'ph',
    // difficulty: 'ph',
    // incorrect_answers: [],
    // question: 'ph',
    // type: 'ph'
    // }
])
  const [active, setActive] = useState<boolean>(false)
  const [active_question, setActive_question] = useState<number>(0)
  const [total_questions, setTotal_of_questions] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [randomized_questions,setRandomizedQuestions] = useState<string[]>([])
  const [answered, setAnswered] = useState<boolean>(false)

  // useEffect( 
  //   () =>
  //   { const ts = async () => {
  //     const url = 'https://opentdb.com/api.php?amount=5'
  
  //     const qs = await (await fetch(url)).json()
  //     setQuestions(qs.results)  
  //   }
  //   ts()}
  //   ,[]
  // )

  const startGame = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    setScore(0)
    setAnswered(false)
    const num_of_questions: Number_of_questions = ((e.currentTarget.elements.namedItem('num_of_questions') as HTMLInputElement).value as Number_of_questions)
    const difficulty: Difficulty = ((e.currentTarget.elements.namedItem('difficulty') as HTMLInputElement).value as Difficulty)
    const ques = await getQuestions(num_of_questions, difficulty)
    const rand_quest_array = shuffleArray([...ques[active_question].incorrect_answers, ques[active_question].correct_answer])
    setQuestions(ques)
    setRandomizedQuestions(rand_quest_array)
    setTotal_of_questions(+num_of_questions)
    setActive(true)
    // const result_div = document.getElementById('result')
    // if(result_div) result_div.style.display = 'none'
    document.getElementById('ts_result')!.style.display = 'none'
  }

  const next_question = (): void => {
    setRandomizedQuestions(shuffleArray([...questions[active_question + 1].incorrect_answers, questions[active_question + 1].correct_answer]))
    setActive_question(active_question + 1)
    setAnswered(false)
    document.getElementById("ts_right_or_wrong")!.style.visibility = 'hidden'
  }

  const checkAnswer = (e: React.MouseEvent<HTMLElement>): void => {
    if(!answered){
      document.getElementById("ts_right_or_wrong")!.style.visibility = 'visible'
      if( e.currentTarget.innerHTML === questions[active_question].correct_answer ){
        e.currentTarget.classList.add("ts_correct")
        document.getElementById("ts_right_or_wrong")!.innerHTML = 'Rätt!'
        setScore(prevscore => prevscore + 1)
      }else{
        e.currentTarget.classList.add("ts_wrong")
        document.getElementById("ts_right_or_wrong")!.innerHTML = 'Fel.'
        //const child_nodes: (NodeListOf<ChildNode> | undefined) = document.getElementById('answers')?.childNodes
        const child_nodes: (NodeListOf<ChildNode>) = document.getElementById('ts_answers')!.childNodes
        //if(child_nodes){
          for(let i=0;i<child_nodes.length;i++){
            let node = document.getElementById(String(i))!
            if(node.innerHTML === questions[active_question].correct_answer) {
              node.classList.add("ts_correct")
            }
          }
        //}
      }
    }
    setAnswered(true)
  }

  const showResult = (): void => {
    setActive(false)
    setQuestions([])
    setRandomizedQuestions([])
    setActive_question(0)
    const result_div = document.getElementById('ts_result')
    if(result_div) result_div.style.display = 'block'
  }
  
  return (
    <div className="ts_app">
      <div id="ts_result">
        <h2 id="bottom_margin">Resultat:</h2>
        Du fick {score} rätt av {total_questions} möjliga.
        <br /><br />
        <hr id="bottom_margin"/>
        Spela igen.
      </div>
      { active ?
          <>
            <p id="ts_stats">Fråga: {active_question + 1}/{total_questions} | Antal rätt: {score}</p>
            <QuestionCmp
              category={questions[active_question].category} 
              correct_answer={questions[active_question].correct_answer} 
              difficulty={questions[active_question].difficulty} 
              incorrect_answers={questions[active_question].incorrect_answers} 
              question={questions[active_question].question} 
              type={questions[active_question].type}
              checkAnswer={checkAnswer}
              active_question={active_question}
              randomized_questions = {randomized_questions}
            />
          </>
      : <div>
          <form id="ts_form" onSubmit={(e) => startGame(e)}>
          <label htmlFor="num_of_questions">Antal frågor:  </label>
            <select className="ts_select" id="ts_num_of_questions" name="num_of_questions">
              <option value={Number_of_questions.FIVE}>5</option>
              <option value={Number_of_questions.TEN}>10</option>
              <option value={Number_of_questions.FIFTHTEEN}>15</option>
            </select>
            <label htmlFor="difficulty">Svårighetsgrad: </label>
            <select className="ts_select"  id="ts_difficulty" name="difficulty">
              <option value={Difficulty.ANY}>Any</option>
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
            </select>
            <br /><br />
            <button id="ts_button">
              Start
            </button>
          </form>
        </div>
      }
      {
        active && answered && active_question < total_questions - 1 ?
        <button onClick={next_question}>Nästa</button>
        : active && answered ? 
        <button onClick={showResult}>Se resultat</button>
        : null
      }
    </div>
  );
}

export default TsQuiz;
