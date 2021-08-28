
// send score to local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById("name").value);
}

// grab score from local storage and apply to page
function getScore() {
    var quizContent= "<h2>" + localStorage.getItem("highscoreName") + "'s highscore is:</h2><h1>" + localStorage.getItem("highscore");
    document.getElementById("highscores").innerHTML = quizContent;
}

getScore();