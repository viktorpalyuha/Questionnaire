let questionsCopy = JSON.parse(localStorage.getItem('questions'));
let quizContainer = document.querySelector('#container-quiz');
let startButton = document.querySelector('#start-button');
let skipButton = document.querySelector('#skip-button');
let question = document.querySelector('#question');
let options = document.querySelectorAll('.options__item');
let gameOver = document.querySelector('#game-over');
let gameOverPrize = document.querySelector('#game-over-prize');
let win = document.querySelector('#win');
let totalPrizeEl = document.querySelector('#total-prize');
let currentPrizeEl = document.querySelector('#current-prize');
let total = 0;
let current = 100;
let randomIndex;
let usedIndexes = [];

startButton.addEventListener('click', () => {
  startGame();
});

skipButton.addEventListener('click', () => {
  newQuestion();
  skipButton.style.display = 'none';
});

options.forEach((item, i) =>
  item.addEventListener('click', () => {
    if (checkAnswer(i)) {
      increasePrizes();
      checkTotal();
      newQuestion();
    } else {
      endGame();
    }
  })
);

function generateIndex() {
  randomIndex = Math.floor(Math.random() * questionsCopy.length);
  if (usedIndexes.includes(randomIndex)) {
    generateIndex();
  } else {
    usedIndexes.push(randomIndex);
  }
}

function startGame() {
  //Reset all the data to initial one
  usedIndexes = [];
  total = 0;
  current = 100;
  totalPrizeEl.innerHTML = total;
  currentPrizeEl.innerHTML = current;
  
  newQuestion();

  //Show all the initial blocks and disable start button
  skipButton.style.display = 'block';
  quizContainer.style.display = 'block';
  startButton.disabled = true;
  win.style.display = 'none';
  gameOver.style.display = 'none';
}

function newQuestion() {
  generateIndex();
  //Add question for user
  question.innerHTML = questionsCopy[randomIndex].question;
  //Add answer options
  options.forEach((item, i) => {
    item.innerHTML = questionsCopy[randomIndex].content[i];
  });
}

function checkAnswer(index) {
  return index === questionsCopy[randomIndex].correct;
}

function increasePrizes() {
  total += current;
  current *= 2;
  totalPrizeEl.innerHTML = total;
  currentPrizeEl.innerHTML = current;
}

//check total and show win if needed
function checkTotal() {
  if (total >= 1000000) {
    win.style.display = 'block';
    startButton.disabled = false;
    skipButton.style.display = 'none';
    quizContainer.style.display = 'none';
  }
}

//end game if user has chosen wrong answer
function endGame() {
  gameOverPrize.innerHTML = total;
  gameOver.style.display = 'block';
  startButton.disabled = false;
  skipButton.style.display = 'none';
  quizContainer.style.display = 'none';
}
