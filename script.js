const titleElement = document.getElementById('ttl')
const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerBtnElement = document.getElementById('answer-btns')

let shuffledQuestions = []
let currentQuestionIndex = 0

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame()  {
    //titleElement.classList.add('hide')
    startBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion()  {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    let numberOfQuestion = currentQuestionIndex + 1
    questionElement.innerText = "Q" + numberOfQuestion + ". " + question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }    
        button.addEventListener('click', selectAnswer)
        answerBtnElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild)
    }
}

function selectAnswer(e)  {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnElement.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    }
    else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('right')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('right')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2 + 2 ?',
        answers: [
            {text: '3', correct: false},
            {text: '4', correct: true},
            {text: '-1', correct: false},
            {text: '0', correct: false}
        ]
    },
    {
        question: 'What is Shakespeare famous for ?',
        answers: [
            {text: 'His plays', correct: true},
            {text: 'His operas', correct: false},
            {text: 'His paintings', correct: false},
            {text: 'His movies', correct: false}
        ]
    },
    {
        question: 'What are the nations composing the United Kingdom ?',
        answers: [
            {text: 'England, Scotland and Wales', correct: false},
            {text: 'England, Ireland, Iceland and Scotland', correct: false},
            {text: 'England, Scotland, Wales and Ireland', correct: false},
            {text: 'England, Northern Ireland, Wales and Scotland', correct: true}
        ]
    },
    {
        question: 'Who created the character of Sherlock Holmes ?',
        answers: [
            {text: 'Maurice Leblanc', correct: false},
            {text: 'Julie Kibler', correct: false},
            {text: 'Sir Arthur Conan Doyle', correct: true},
            {text: 'Agatha Christie', correct: false}
        ]
    },
    {
        question: 'How is the anthem of the United Kingdom called ?',
        answers: [
            {text: 'The Star-Spangled Banner', correct: false},
            {text: 'God save the Queen', correct: true},
            {text: 'Advance Australia Fair', correct: false},
            {text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'What is the name of the river that flows in London ?',
        answers: [
            {text: 'Thames', correct: true},
            {text: 'Ribble', correct: false},
            {text: 'Avon', correct: false},
            {text: 'Atlas', correct: false}
        ]
    }
]
