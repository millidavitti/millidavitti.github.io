'use strict';

// Selected elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const winScore = 200;
currentScore0El.textContent = 0;
currentScore1El.textContent = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const winner = function () {
  diceEl.classList.add('hidden');
  document.querySelector('.btn--roll').disabled = true;
  document.querySelector('.btn--hold').disabled = true;
};

const score = function () {
  document.getElementById(`score--${activePlayer}`).textContent =
    Number(document.getElementById(`score--${activePlayer}`).textContent) +
    currentScore;
  currentScore = 0;
};

// Dice roll

btnRoll.addEventListener('click', function () {
  // generates and displays a random die number
  let dice = Math.trunc(Math.random() * 6) + 1;

  // display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // check if rolled die is 1:
  if (dice !== 1) {
    // Add to score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // swicth players
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

btnHold.addEventListener('click', function () {
  if (currentScore > 0) {
    score()
    currentScore0El.textContent = currentScore;
    // if palyer 1 wins
    if (
      activePlayer === 0 &&
      Number(document.getElementById(`score--0`).textContent) >= winScore
    ) {
      player0.classList.add('player--winner');
      winner();
    } else {
      if (activePlayer === 1) {
        score()
        currentScore1El.textContent = currentScore;
        // if player 2 wins
        if (
          activePlayer === 1 &&
          Number(document.getElementById(`score--1`).textContent) >= winScore
        ) {
          player1.classList.add('player--winner');
          winner();
        }
      }
    }
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  if (activePlayer === 1) {
    player0.classList.remove('player--winner');
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    activePlayer = 0;
  } else {
    player1.classList.remove('player--winner');
    activePlayer = 0;
  }

  document.querySelector('.btn--roll').disabled = false;
  document.querySelector('.btn--hold').disabled = false;
});

// DONALD DON DID IT
