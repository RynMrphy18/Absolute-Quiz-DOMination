var questions = [
    {
        title: "Inside which HTML element do we put JavaScript?",
        choices: ["<js>", "<script>", "<javascript>", "<div>"],
        answer: "<script"
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
        answer: "True"
    },
    {
        title: "Which operator assigns a value to a variable?",
        choices: ["-","x","+","="],
        answer: "="
    }
    ];
    
// defined global variables
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#submit");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl= document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

    
function startQuiz() {
    // puts away beginning screen
    var startQuizEl = document.getElementById("start-quiz")
    startQuizEl.setAttribute("class", "hide");

    // reveals questions
    questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    askQuestion();
    clockTick();
}

function askQuestion() {
    // access question array
    var currentQuestion = questions[currentQuestionIndex];

    // change title to current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear old questions
    choicesEl.innerHTML = "";

    // loop choices
    currentQuestion.choices(function(choice, i) {
        // create button for each choice
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;

        // event listener for buttons
        choiceBtn.onclick = questionClick;

        // add to page
        titleEl.appendChild(choiceBtn);

    });
}

function questionClick() {
    // time penalty if wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

    // stop timer at 0
    if (time < 0) {
        time= 0;
    }

    // display new time
    timerEl.textContent = time;

    feedbackEl.textContent = "Incorrect!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%"
    } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
    }

    // right/wrong feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // pull next question
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        question();
    }   
}


function quizEnd() {

    clearInterval(timerId);

    var endQuizEl= document.getElementById("end-quiz");
    endQuizEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textcontent = time;

    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textcontent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveScores() {

    var initials = initialsEl.value.trim();

    // get saved scores from local storage or create new array if empty
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
        score: time,
        initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "score.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveScores();
    }
}

submitBtn.onclick = saveScores;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;