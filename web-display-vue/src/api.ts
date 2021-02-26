

export enum NUMBER_OF_QUESTIONS {
    FIVE = 5,
    TEN = 10,
    FIFTHTEEN = 15
}

export enum DIFFICULTY {
    ANY = '',
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
} 

export const getQuestions = async ( numOfQuestions: NUMBER_OF_QUESTIONS, difficulty: DIFFICULTY ) => {
//export const getQuestions = async ( numOfQuestions: string, difficulty: string ) => {
    const url = `https://opentdb.com/api.php?amount=${numOfQuestions}&type=multiple&difficulty=${difficulty}`
    const qs = await (await fetch(url)).json()
console.log(qs.results)
    return qs.results
}