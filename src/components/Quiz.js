import React from 'react'

export default React.memo(function Quiz(props) {
    
    const { question, answers, correct_answer, toggleClicked, question_id, showCorrect } = props

    const questionAndAnswersElements = answers.map(answer => {
        let styles = {}
        if (showCorrect) {
            if (answer.isClicked) {
                answer.answer === correct_answer ? 
                    styles = { backgroundColor: "#94D7A2" } :
                    styles = { backgroundColor: "#f8bcbc" }
            } else {
                if (answer.answer === correct_answer) {
                    styles = { backgroundColor: "#94D7A2" }
                }
            }
        } else {
            styles = { backgroundColor: answer.isClicked ? "#D6DBF5" : "#fff" }
        }
            
        return <button
                    className='answers'
                    key={ answer.id }
                    style={ styles }
                    onClick={ () => toggleClicked(question_id, answer.id) }
                >
                    { answer.answer }
                </button>
    })

    return (
        <div className='question-answers-div'>
            <h3 className='questions'>{ question } </h3>
            <div className='answer-buttons'>
                {  questionAndAnswersElements }
            </div>
        </div>
    )
})