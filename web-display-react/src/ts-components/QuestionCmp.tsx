import * as React from 'react';
import { Question } from '../TsQuiz'
import "../tsMain.css"


// type Props = {
//     category: string
//     correct_answer: string
//     difficulty: string
//     incorrect_answers: string[]
//     question: string
//     type: string
// }
type Props = Question & {checkAnswer: any} & {active_question: number} & {randomized_questions: string[]}
 
const QuestionCmp: React.FC<Props> = ({category, question, checkAnswer, randomized_questions}) => {
  
    return (
        <div>
           <h1 id="bottom_margin">{category}</h1>
           <h2 id="bottom_margin" dangerouslySetInnerHTML={{__html: question}}></h2>
           <p id="ts_right_or_wrong"></p>
           {/* <p>{correct_answer}</p> */}
           <div id="ts_answers">
            {
              randomized_questions.map( answer => 
              <div id={String(randomized_questions.indexOf(answer))} 
                className="ts_answer" key={answer} 
                onClick={ (e) => checkAnswer(e)}
                dangerouslySetInnerHTML={{__html: answer}}>
              </div> ) 
            }
          </div>
        </div>
      );
}
 
export default QuestionCmp;