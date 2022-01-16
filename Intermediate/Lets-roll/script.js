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
const customWinScore = document.querySelector('#target');
const closeRules = document.querySelector('.close-rules');
const rulesContainer = document.querySelector('.rules');

class Roll {
  // Private Methods and Properties
  #winScore;
  #currentScore = 0;
  #activePlayer = 0;

  #winner() {
    diceEl.classList.add('hidden');
    document.querySelector('.btn--roll').disabled = true;
    document.querySelector('.btn--hold').disabled = true;
  }

  #score() {
    document.getElementById(`score--${this.#activePlayer}`).textContent =
      Number(
        document.getElementById(`score--${this.#activePlayer}`).textContent
      ) + this.#currentScore;
    this.#currentScore = 0;
  }

  #setScore() {
    rulesContainer.classList.add('hidden');
    document.querySelector('.rules-overlay').classList.add('hidden');
    this.#winScore = +customWinScore.value || 200;
    document.querySelector('#target').value = '';
  }

  #letsRoll() {
    // generates and displays a random die number
    let dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check if rolled die is 1:
    if (dice !== 1) {
      // Add to score
      this.#currentScore += dice;
      document.getElementById(`current--${this.#activePlayer}`).textContent =
        this.#currentScore;
    } else {
      // swicth players
      document.getElementById(`current--${this.#activePlayer}`).textContent = 0;
      this.#currentScore = 0;
      this.#activePlayer = this.#activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }

  #hold() {
    if (this.#currentScore > 0) {
      this.#score();
      currentScore0El.textContent = this.#currentScore;
      // if palyer 1 wins
      if (
        this.#activePlayer === 0 &&
        Number(document.getElementById(`score--0`).textContent) >=
          this.#winScore
      ) {
        player0.classList.add('player--winner');
        this.#winner();
      } else {
        if (this.#activePlayer === 1) {
          this.#score();
          currentScore1El.textContent = this.#currentScore;
          // if player 2 wins
          if (
            this.#activePlayer === 1 &&
            Number(document.getElementById(`score--1`).textContent) >=
              this.#winScore
          ) {
            player1.classList.add('player--winner');
            this.#winner();
          }
        }
      }
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      this.#activePlayer = this.#activePlayer === 0 ? 1 : 0;
    }
  }

  #newGame() {
    this.#currentScore = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;

    if (this.#activePlayer === 1) {
      player0.classList.remove('player--winner');
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
      this.#activePlayer = 0;
    } else {
      player1.classList.remove('player--winner');
      this.#activePlayer = 0;
    }

    rulesContainer.classList.remove('hidden');
    document.querySelector('.rules-overlay').classList.remove('hidden');
    document.querySelector('#target').focus();

    document.querySelector('.btn--roll').disabled = false;
    document.querySelector('.btn--hold').disabled = false;
  }

  #displayRules(e) {
    if (e.target.matches('.close-rules')) this.#setScore();

    // Form
    if (e.target.matches('#target')) {
      const form = e.target.closest('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        this.#setScore();
      });
    }
  }

  constructor() {
    btnRoll.addEventListener('click', this.#letsRoll.bind(this));

    btnHold.addEventListener('click', this.#hold.bind(this));

    btnNew.addEventListener('click', this.#newGame.bind(this));

    rulesContainer.addEventListener('click', this.#displayRules.bind(this));

    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
  }

  set winScore(score) {
    this.#winScore = score;
  }

  get winScore() {
    return this.#winScore;
  }
}

new Roll();

