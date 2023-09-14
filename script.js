'use strict';

//html objects
const btn = {
  newGame: document.querySelector('.btn--new'),
  hold: document.querySelector('.btn--hold'),
  roll: document.querySelector('.btn--roll'),
};

const player1 = {
  el: document.querySelector('.player--0'),
  name: document.querySelector('#name--0'),
  score: document.querySelector('#score--0'),
  currentScore: document.querySelector('#current--0'),
};

const player2 = {
  el: document.querySelector('.player--1'),
  name: document.querySelector('#name--1'),
  score: document.querySelector('#score--1'),
  currentScore: document.querySelector('#current--1'),
};

//starting condition
const diceImage = document.querySelector('.dice');
diceImage.classList.add('hidden');

let activePlayer = player1;

//Mulit-Use Functions
const playerSwitch = function () {
  player2.el.classList.toggle('player--active');
  player1.el.classList.toggle('player--active');
  if (player1.el.classList.contains('player--active')) {
    activePlayer = player1;
  } else {
    activePlayer = player2;
  }
};

const disableButtons = function () {
  btn.hold.setAttribute('disabled', '');
  btn.roll.setAttribute('disabled', '');
  diceImage.classList.add('hidden');
};

//Buttons
btn.roll.addEventListener('click', function () {
  let dice = Math.trunc(Math.random() * 6 + 1);
  diceImage.classList.remove('hidden');
  diceImage.src = `dice-${dice}.png`;

  if (dice !== 1) {
    activePlayer.currentScore.textContent =
      Number(activePlayer.currentScore.textContent) + dice;
  } else {
    activePlayer.currentScore.textContent = 0;
    playerSwitch();
  }
});

btn.hold.addEventListener('click', function () {
  activePlayer.score.textContent =
    Number(activePlayer.score.textContent) +
    Number(activePlayer.currentScore.textContent);
  activePlayer.currentScore.textContent = 0;

  if (Number(activePlayer.score.textContent) >= 10) {
    activePlayer.el.classList.add('player--winner');
    activePlayer.name.textContent = 'Player 1 wins!';
    disableButtons();
  } else {
    playerSwitch();
  }
});

btn.newGame.addEventListener('click', function () {
  activePlayer.el.classList.remove('player--active');
  player1.el.classList.add('player--active');

  player2.name.textContent = 'Player 2';
  player1.name.textContent = 'Player 1';
  player1.currentScore.textContent = 0;
  player2.currentScore.textContent = 0;
  player1.score.textContent = 0;
  player2.score.textContent = 0;
  btn.hold.removeAttribute('disabled', '');
  btn.roll.removeAttribute('disabled', '');
  activePlayer.el.classList.remove('player--winner');
});
