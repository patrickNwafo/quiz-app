const questions = [
    {
        question: "What is another name for Vitamin C?",
        answers: [
            { text: "Boltanic", correct: false },
            { text: "ascorbic acid", correct: true },
            { text: "Magnisuim acid", correct: false },
            { text: "Vitamin", correct: false },
        ]
    },
    {
        question: "What is the dossage of Paracetamol for adults?",
        answers: [
            { text: "2000mg three times daily", correct: false },
            { text: "1g three times daily", correct: true },
            { text: "500mg 5 times daily", correct: false },
            { text: "Anytime", correct: false },
        ]
    },
    {
        question: "Which of these is a Contraceptive?",
        answers: [
            { text: "Boltanic", correct: false },
            { text: "Diazapan", correct: false },
            { text: "Vitamin C", correct: false },
            { text: "Monophasic", correct: true },
        ]
    },
    {
        question: "Which of these is a Immune Booster?",
        answers: [
            { text: "Vitamin D", correct: true },
            { text: "Sulfur", correct: false },
            { text: "Vitamin E", correct: false },
            { text: "Vitamin B2", correct: false },
        ]
    },
    {
        question: "All these are Hypertensive drugs except?",
        answers: [
            { text: "Moexipril (Univasc)", correct: false },
            { text: "Lisinopril (Prinivil, Zestril)", correct: false },
            { text: "Metformin", correct: true },
            { text: "Captopril (Capoten)", correct: false },
        ]
    },
    {
        question: "Which of these creams stops Vigina itching?",
        answers: [
            { text: "Funbact A", correct: false },
            { text: "hydrocortisone", correct: true },
            { text: "Metformin", correct: false },
            { text: "Captopril (Capoten)", correct: false },
        ]
    },
    {
        question: "Ibrufen is used for?",
        answers: [
            { text: "Pains", correct: true },
            { text: "Typhiod", correct: false },
            { text: "Head ache", correct: false },
            { text: "Cancer", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australlia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
