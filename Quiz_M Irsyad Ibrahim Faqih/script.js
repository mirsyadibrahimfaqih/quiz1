const questions = [
    {
        question: "Apa kepanjangan dari HTML",
        answers : [
            { text: "Hyper teks Member Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Hyper Link Markup Leaguage", correct: false},
            { text: "Hyper Team Markup Laguage", correct: false},
        ]
    },
    {
        question: "Apa kepanjangan dari WWW",
        answers : [
            { text: "World web wide", correct: false},
            { text: "World Wide Web", correct: true},
            { text: "Web wide world", correct: false},
            { text: "Web world wide", correct: false},
        ]
    },
    {
        question: "Profesi gabungan antara Frontend dan Backend disebut",
        answers : [
            { text: "Web Developer", correct: false},
            { text: "Full Stack Developer", correct: true},
            { text: "Senior App Developer", correct: false},
            { text: "Multiplatform Web Developer", correct: false},
        ]
    },
    {
        question: "Sebutkan versi terbaru HTML!",
        answers : [
            { text: "HTML6", correct: false},
            { text: "HTML5", correct: true},
            { text: "HTML9", correct: false},
            { text: "HTML999", correct: false},
        ]
    },
    {
        question: "Frontend adalah profesi yang berfokus pada",
        answers : [
            { text: "Testing", correct: false},
            { text: "Tampilan Aplikasi", correct: true},
            { text: "Database Aplikasi", correct: false},
            { text: "Problem Aplikasi", correct: false},
        ]
    }
]
const questionElement = document.getElementById("question");
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
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

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
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
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
})


startQuiz();