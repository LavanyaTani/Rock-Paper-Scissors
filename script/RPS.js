let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

const rockValue = 3;
const paperValue = 2;
const scissorsValue = 1;

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {

  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

  }

}


document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-auto-play-button').addEventListener('click', autoPlay);


document.body.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'r') {
    playGame('rock');
  } else if (key === 'p') {
    playGame('paper');
  } else if (key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = getResult(playerMove, computerMove);

  updateScore(result);
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  displayMoves(playerMove, computerMove);
}

//Name<getResult>//
//Params<playerMove = user input,computerMove = random math computor input//
//Returns<Return a string of ......>//
function getResult(playerMove, computerMove) {
  const playerValue = getValue(playerMove);
  const computerValue = getValue(computerMove);

  if (playerValue > computerValue) {
    return 'You win.';
  } else if (playerValue < computerValue) {
    return 'You lose.';
  } else {
    return 'Tie.';
  }
}
(playerMove > computerMove) ? 'you win' : 'you lose';


function updateScore(result) {
  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function displayMoves(playerMove, computerMove) {
  document.querySelector('.js-moves').innerHTML =
    `You
    <img src="images/${playerMove}-emoji.png" class="movie-icon">
    <img src="images/${computerMove}-emoji.png" class="movie-icon"> 
    Computer`;
}

function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return moves[randomNumber];
}

function getValue(move) {

  if (move === 'rock') {
    return rockValue;
  }
  else if (move === 'paper') {
    return paperValue;
  }
  else if (move === 'scissors') {
    return scissorsValue;
  }
  else {
    return 0;
  }

}
