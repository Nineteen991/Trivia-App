import React from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'
import yellowBlob from './images/blobs-yellow.png'
import blueBlob from './images/blobs-blue.png'
import './App.css'
import { v4 as uuid } from 'uuid'

export default function App() {

	const [startQuiz, setStartQuiz] = React.useState(true)
	const [numQuestions, setNumQuestions] = React.useState(5)
	const [difficulty, setDifficulty] = React.useState("medium")
	const [questions, setQuestions] = React.useState([])
	const [count, setCount] = React.useState(0)
	const [showCorrect, setShowCorrect] = React.useState(false)
	const [resetQuiz, setResetQuiz] = React.useState(false)

	React.useEffect(() => {
		function shuffleArray(array) {
			for (let i = array.length - 1; i>0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]]
			}
		}
// https://opentdb.com/api_config.php
        fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=17&difficulty=${difficulty}`)
			.then(res => res.json())
			.then(data => {
				setQuestions(() => {
					return data.results.map(question => {

						question.incorrect_answers.push(question.correct_answer)
						shuffleArray(question.incorrect_answers)
						const newAnswers = question.incorrect_answers.map(answer => (
							{
								answer: answer,
								isClicked: false,
								id: uuid()
							}
						))

						if(question.incorrect_answers) {
							delete question.incorrect_answers
						}

						return { ...question, answers: newAnswers, id: uuid() }
					})
				})
			})
		
		
    }, [resetQuiz, numQuestions])

	function howManyQs(num) {
		setNumQuestions(num)
	}

	function chooseDifficulty(level) {
		setDifficulty(level)
		startQuizComponent()
	}

  	function startQuizComponent() {
    	setStartQuiz(false)
  	}

	function toggleClicked(question_id, answer_id) {
		setQuestions(prevQuestions => {
			return prevQuestions.map(question => {
				if (question_id === question.id) {
					const newAnswers = question.answers.map(answer => (
						answer.id === answer_id ?
							{...answer, isClicked: !answer.isClicked} :
							answer
					))
					return {...question, answers: newAnswers}
				} else {
					return question
				}
			})
		})
	}
	
	function checkAnswers() {
		questions.map(question => {
			return question.answers.map(answer => {
				if (question.correct_answer === answer.answer && answer.isClicked === true) {
					return setCount(prev => prev + 1)
				} else {
					return answer
				}
			})
		})
		showCorrectAnswers()
	}

	function showCorrectAnswers() {
		setShowCorrect(true)
	}

	function reset() {
		setStartQuiz(true)
		setQuestions([])
		setCount(0)
		setShowCorrect(false)
		setResetQuiz(prev => !prev)
	}
	
	const quizElements = questions.map(question => (
		<Quiz
			key={question.id}
			question={question.question}
			answers={question.answers}
			correct_answer={question.correct_answer}
			question_id={ question.id }
			toggleClicked={ toggleClicked }
			showCorrect={ showCorrect }		
		/>
	))

  	return (
		<main>
			<img src={ yellowBlob } alt='Yellow blob' className='yellow-blob' />
      		{ startQuiz ? 
        		<Start numQuestions={ numQuestions } howManyQs={ howManyQs } chooseDifficulty={ chooseDifficulty } /> :
				<div className='quiz'>
					{ quizElements }
					<div className='checkAnswers'>
						{ showCorrect && <h4 className='checkAnswers--score'>You scored { count } / { numQuestions } correct answers</h4> }
						
						{ 
							showCorrect ? 
							<button className='checkAnswers--btn' onClick={ reset }>Play Again?</button> :
							<button className='checkAnswers--btn' onClick={ checkAnswers }>Check Answers</button>
						}
						
					</div>
				</div>
      		}
			<img src={ blueBlob } alt='Blue blob' className='blue-blob' />
    	</main>
  	)
}