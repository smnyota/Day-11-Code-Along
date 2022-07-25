// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Select the spans & divs where we'll display outputs.
const pointsSpan = document.querySelector("#points");
const scoreSpan = document.querySelector("#score");
const questionDiv = document.querySelector("#question");

// Select the buttons and input fields where users can provide inputs.
const randomButton = document.querySelector("#random");
const hardButton = document.querySelector("#hard");
const catPunsButton = document.querySelector("#catPuns");
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");

// Starting variables - we'll fill replace these with the API
let currentQuestion =
  "The Japanese name for this grass-type pokemon, Fushigidane, is a pun on the phrase 'strange seed.'";
let currentAnswer = "bulbasaur";
let currentPoints = 300;
let currentScore = 0;

// Function to update the text on the board to match our variables.
//the same thing as function updateboard() { }
//This is defining the function
const updateBoard = () => {
  pointsSpan.innerHTML = currentPoints;
  scoreSpan.innerHTML = currentScore;
  // Update the question too.
  questionDiv.innerHTML = currentQuestion;
};

// Call the function! 
updateBoard();

// Finish this function that checks the user's answer.
//1. Call function when submit button is pressed
//2. Update points
const checkAnswer = () => {
  console.log("You guessed:", answerInputBox.value);
  console.log("Correct answer:", currentAnswer);
    if (answerInputBox.value.toLowerCase() === currentAnswer.toLowerCase()) { //makes comparison case-insensitive
    currentScore += currentPoints;
  } else {
    alert("Not quite, but keep trying!");
    currentScore -= currentPoints;
  }
  updateBoard();
};

// Attach that function to the submit button via an event listener.
submitButton.addEventListener("click", checkAnswer);
//Because the function is already defined we can just use the simiple notation ^


// Write out an API call for each of the three question byttons on screen.
const getRandomQuestion = async () => {
  console.log("random button clicked");
  const response = await fetch("https://jeopardy.wang-lu.com/api/random?count=1");
  console.log(response);
  const data = await response.json();
  console.log(data[0]);
  currentQuestion = data[0].question;
  console.log(currentQuestion);
  currentAnswer = data[0].answer;
  console.log(currentAnswer);
  currentPoints = data[0].value;
  console.log(currentPoints);
  updateBoard();
}

randomButton.addEventListener("click", getRandomQuestion);

//anytime you have an await you need to have async


//Hard Question
//Hard Questions are worth 1000 points
const getHardQuestion = async () => {
  console.log("random button clicked");
  const response = await fetch("https://jeopardy.wang-lu.com/api/clues?value=1000");
  console.log(response);
  const data = await response.json();
  const index = getRandomInt(data.length);
  console.log(index);
  
  console.log(data[index]);
  currentQuestion = data[index].question;
  console.log(currentQuestion);
  currentAnswer = data[index].answer;
  console.log(currentAnswer);
  currentPoints = data[index].value;
  console.log(currentPoints);
  updateBoard();
}

hardButton.addEventListener("click", getHardQuestion);


//FinalButton

//Cat Question
//Cat Questions are worth 1000 points
const getCatQuestion = async () => {
  console.log("random button clicked");
  const response = await fetch("https://jeopardy.wang-lu.com/api/clues?category=84");
  //cat question is = 1936
  console.log(response);
  const data = await response.json();
  const index = getRandomInt(data.length);
  console.log(index);
  
  console.log(data[index]);
  currentQuestion = data[index].question;
  console.log(currentQuestion);
  currentAnswer = data[index].answer;
  console.log(currentAnswer);
  currentPoints = data[index].value;
  console.log(currentPoints);
  updateBoard();
}

catPunsButton.addEventListener("click", getCatQuestion);
