import React from 'react'

export default function Start(props) {
    return (
        <div className='start'>
            <div className='quizzical'>
                <h1 className='title'>Quizzical</h1>
                <h3 className='desc'>A quiz with { props.numQuestions } questions</h3>
                <div className='setDifficulty-btn'>
                    
                    <button 
                        className='start-quiz-btn five'
                        onClick={ () => props.howManyQs(5) }
                    >
                        5 Questions
                    </button>
                    <button
                        className='start-quiz-btn ten'
                        onClick={ () => props.howManyQs(10) }
                    >
                        10 Questions
                    </button>


                    <button 
                        className='start-quiz-btn'
                        onClick={ () => props.chooseDifficulty("medium") }
                    >
                        Start Medium
                    </button>
                    <button
                        className='start-quiz-btn'
                        onClick={ () => props.chooseDifficulty("hard") }
                    >
                        Start Hard
                    </button>

                </div>
            </div>
        </div>
    )
}