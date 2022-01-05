'use strict';

const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const number = document.querySelector('.number');
const checkBtn = document.querySelector('.check');
const reset = document.querySelector('.again');
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let scoreVal = 14;
let highScoreVal = 0;
// check handler

checkBtn.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // No input
  if (!guess) {
    message.textContent = 'Not a valid guess ❌';

    //Correct guess
  } else if (guess === secretNumber) {
    if (scoreVal > highScoreVal) {
      highScoreVal = scoreVal;
      highScore.textContent = highScoreVal;
    }
    number.style.width = '30rem';
    number.textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    message.textContent = 'Your guess was corret 😎';

    //Too high
  } else if (guess > secretNumber) {
    if (scoreVal > 1) {
      scoreVal--;
      score.textContent = scoreVal;
      message.textContent = 'Your guess was too high 🔼';
    } else {
      message.textContent = 'You ran out of guesses 😢';
      score.textContent = 0;
      secretNumber = null;
    }

    //Too low
  } else if (guess < secretNumber) {
    if (scoreVal > 1) {
      scoreVal--;
      score.textContent = scoreVal;
      message.textContent = 'Your guess was too low 🔽';
    } else {
      message.textContent = 'You ran out of guesses 😢';
      score.textContent = 0;
      secretNumber = null;
    }
  }
});

// reset
reset.addEventListener('click', function () {
  scoreVal = 14;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  message.textContent = 'Start guessing...';
  score.textContent = 14;
  document.querySelector('body').style.backgroundColor = '#222';
  number.textContent = '?';
  number.style.width = '15rem';
  document.querySelector('.guess').value = '';
});
