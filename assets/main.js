
// numerical global variables    
var score= 0;
var currentQuestion = -1
var timeLeft = 0;
var timer;

function startQuiz() {
// start timer upon button click
  timeLeft = 75;
  document.getElementById("time").innerHTML = timeLeft;

  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("time").innerHTML = timeLeft;

    // end game when timer reaches 0
    if (timeLeft <= 0) { 
        timeLeft = 0
        clearInterval(timer);
        endGame();
    }
  }, 1000);

    // call question function as timer starts

  next();
}

// stop game 

function endGame() {
    clearInterval(timer);

    // makes remaining time into final score 
    score = timeLeft;

    // define and append final score to page

    var quizContent = "<h2>Game Over!<h2> Your final score was " + score + "! Great job!</h2><h3>Save your score here!</h3><input type='text' id='name' placeholder = 'First name'><button onclick='setScore()'>Save!</button>";

    document.getElementById("quiz").innerHTML = quizContent;


}
// sends score and name to local storage

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById("name").value);
    getScore();
}

// pulls score and name from local storage (pushed to page in score.js)
function getScore() {
    var quizContent= "<h2>" + localStorage.getitem("highscoreName") + "'s highscore is:</h2>" + localStorage.getItem("highscore");

    document.getElementById("quiz").innerHTML = quizContent;
}

// time remains same if answer correct and moves to next question
function correct() {
timeLeft= timeLeft
next();
}

// 15 seconds subtracted if answer wrong and moves to next question
function incorrect(){
timeLeft = timeLeft-15;
next();
}

function next() {
    currentQuestion++;

    // ends game if questions run out
    if (currentQuestion > questions.length-1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    // question loop
    for (var buttonLoop = 0;buttonLoop < questions[currentQuestion].choices.length;buttonLoop++) {

        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
           
        // checks if answer correct
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        }

        else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    // pushes question and answer to page 
    document.getElementById("quiz").innerHTML = quizContent 
}