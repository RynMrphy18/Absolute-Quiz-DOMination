I had to take an out of state trip until this past Tuesday so I was pressed for time finishing this. I decided to prioritize the functionality and didn't use CSS. I hope you can understand

WHEN I click the start button
THEN a timer starts and I am presented with a question

Created a function that would call both my question/answer function and start my timer at the same time and iniated by a button seen on the deployed page

WHEN I answer a question
THEN I am presented with another question

Re-called my question/answer function inside another function deciding what to do if the answer is correct/incorrect and loops until the quiz is over/time ends

WHEN I answer a question incorrectly
THEN time is subtracted from the clock

Removed time from the timer variable if the chosen answer was not the correct one using an if statement and a linked function

WHEN all questions are answered or the timer reaches 0
THEN the game is over

Created an if statement when the questions.length reached the end to end the quiz and another doing the same when the timer was less than or equal to zero

WHEN the game is over
THEN I can save my initials and score

Created functions setting, pulling and posting the two statistics from local storage 