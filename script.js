const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Home Tool Markup Language", correct: false},
            { text: "Hyper Tool Markup Language", correct: false},
        ]
    },
    {
        question: "'OS' computer abbreviation usually means?",
        answers: [
            { text: "Operating System", correct: true},
            { text: "Open Software", correct: false},
            { text: "Order of Significance", correct: false},
            { text: "Optical Sensor", correct: false},
        ] 
    },
    {
        question: "How many bits is a byte?",
        answers: [
            { text: "4", correct: false},
            { text: "8", correct: true},
            { text: "16", correct: false},
            { text: "32", correct: false},
        ] 
    },
    {
        question: "Which is a type of Electrically-Erasable Programmable Read-Only Memory?",
        answers: [
            { text: "Flange", correct: false},
            { text: "FRAM", correct: false},
            { text: "Fury", correct: false},
            { text: "Flash", correct: true},
        ] 
    },
    {
        question: "What are the types of linkages?",
        answers: [
            { text: "Internal and External", correct: false},
            { text: "External and None", correct: false},
            { text: "External, Internal and None", correct: true},
            { text: "Internal", correct: false},
        ] 
    }
];
const questionElement =  document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();