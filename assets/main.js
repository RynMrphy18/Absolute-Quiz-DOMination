var questions = [
    {
        title: "Inside which HTML element do we put JavaScript?",
        choices: ["<js>", "<script>", "<javascript>", "<div>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["The body section", "The head section", "Either is okay"],
        answer: "Either is okay"
    },
    {
        title: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script name='xxx.js'>", "script href='xx.js'>","<script href='xxx.js'>", "<script src='xxx.js'>"],
        answer: "<script src= 'xxx.js'>"
    },
    {
        title: "How do you write 'You died!' in an alert box?",
        choices: ["alertBox('You died!')", "msg('You died!')", "alert('You died!')", "confirm('You died!')"],
        answer: "alert('You died!')"
    },
    {
        title: "How do you call a function called 'myFunction'?",
        choices: ["myfunction()","call myFunction()", "myfunction()", "please call function()"],
        answer: "myFunction()"
    },
    {
        title: "How do you write an IF statement where i does not equal 10?",
        choices: ["if i != 10","if i<10, i>10", "if (i!==10)", "if (i is not equal to 10)"],
        answer: "if (i!==10)"
    },
    {
        title: "How does a for loop start?",
        choices: ["for (i = 0)", "for (i = 0;i <= 5)", "for England, James", "for (i = 0;i <= 5;i++)"],
        answer: "for (i = 0;i <= 5;i++)"
    },
    {
        title: "Which of the following is a correct array?",
        choices: ["var fruits= (banana, apple, durian)","var fruits = {banana, apple, durian}","var fruits = [banana, apple, durian]","var fruits='banana, apple, durian'"],
        answer: "var fruits = [banana, apple, durian]"
    },
    {
        title: "True or False: JavaScript is the same as Java",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "Which operator assigns a value to a variable?",
        choices: ["-","x","+","="],
        answer: "="
    }
    ];

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
    document.getElementById("time").innerHTML = timeLeft

    // end game when timer reaches 0
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
  }, 1000);
}

function endGame() {
    clearInterval(timer);

    var quizContent = "<h2>Game Over!<h2> Your final score was " + score + "! Great job!</h2><h3>Save your score here!</h3><input type='text' id='name' placeholder = 'First name'><button onclick='setScore()'>Save!</button>";

    document.getElementById("quiz").innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById("name").value);
    getScore();
}

function getScore() {
    var quizContent= "<h2>" + localStorage.getitem("highscoreName") + "'s highscore is:</h2><h1>" + localStorage.getItem("highscore") + "</h1><br> <button onclick='clearScore()'>Clear score!</button><button onclick='resetGame()'>Play again!</button>";

    document.getElementById("quiz").innerHTML = quizContent;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeleft= 0
    timer = null;

    document.getElementById("time").innerHTML = time;

    var quizContent = "<h1>JavaScript Quiz! The more questions you get right, the higher your score! Click below to begin. </h1><button onclick='startQuiz()'>Start quiz!</button>"

    document.getElementById("quiz").innerHTML = quizContent;
}

function correct() {

}

function incorrect(){

}

function next() {
    currentQuestion++;

    if (currentQuestion > questions.length-1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0;buttonLoop < questions[currentQuestion].choices.length;buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        }
        else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quiz").innerHTML = quizContent 
}