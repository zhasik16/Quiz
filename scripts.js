const questions = [
	{
		question: "Which is largest planet in the solar system?",
		answers: [
			{text: "Mercury", correct: false},
			{text: "Earth", correct: false},
			{text: "Jupiter", correct: true},
			{text: "Mars", correct: false},
		]
	},
	{
		question: "Who is The Weeknd?",
		answers: [
			{text: "Singer", correct: true},
			{text: "Businessman", correct: false},
			{text: "Teacher", correct: false},
			{text: "Football player", correct: false},
		]
	},
	{
		question: "Square root of 225?",
		answers: [
			{text: "32", correct: false},
			{text: "15", correct: true},
			{text: "25", correct: false},
			{text: "20", correct: false},
		]
	},
	{
		question: "When did  Brawl Stars released?",
		answers: [
			{text: "2014", correct: false},
			{text: "2024", correct: false},
			{text: "2018", correct: false},
			{text: "2017", correct: true},
		]
	},
	{
		question: "Who is the 17th World Chess Champion?",
		answers: [
			{text: "Paul Murphy", correct: false},
			{text: "Robert James Fisher", correct: false},
			{text: "Magnus Carlsen", correct: true},
			{text: "Garry Kasparov", correct: false},
		]
	}
];

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
		if(answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState() {
	nextButton.style.display = "none";
	while(answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	}
	else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
	nextButton.innerHTML = "Play again?";
	nextButton.style.display = "block";
}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	}
	else {
		showScore();
	}
}

nextButton.addEventListener("click", ()=> {
	if(currentQuestionIndex < questions.length) {
		handleNextButton();
	}
	else {
		startQuiz()
	}
})


startQuiz();