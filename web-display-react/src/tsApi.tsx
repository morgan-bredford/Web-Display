

export enum Number_of_questions {
    FIVE = '5',
    TEN = '10',
    FIFTHTEEN = '15'
}

export enum Difficulty {
    ANY = '',
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
} 

export const getQuestions = async ( num_of_questions: Number_of_questions, difficulty: Difficulty ) => {
    const url = `https://opentdb.com/api.php?amount=${num_of_questions}&type=multiple&difficulty=${difficulty}`
    const qs = await (await fetch(url)).json()
console.log(qs.results)
    return qs.results
}
 
