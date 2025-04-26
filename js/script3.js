// Select DOM elements
const gameContainer = document.getElementById('game-container');
const resetButton = document.getElementById('reset-button');
const difficultySlider = document.getElementById('difficulty');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');

// Game variables
let gridSize = parseInt(difficultySlider.value); // Grid size (e.g., 4x4)
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;

// Initialize the game
function initGame() {
  clearInterval(timerInterval); // Reset the timer
  timer = 0;
  moves = 0;
  matchedPairs = 0;
  flippedCards = []; // Clear flipped cards array on reset
  gridSize = parseInt(difficultySlider.value); // Update grid size from slider
  movesDisplay.textContent = `Moves: ${moves}`;
  timerDisplay.textContent = `Time: ${timer}s`;
  gameContainer.innerHTML = ''; // Clear the board
  generateCards();
  renderBoard();
  startTimer();
}

function generateCards() {
  const totalCards = (gridSize * gridSize) / 2; // Half the grid size
  const symbols = Array.from({ length: totalCards }, (_, i) => String.fromCharCode(65 + i)); // A, B, C...
  cards = [...symbols, ...symbols]; // Duplicate symbols for pairs
  shuffleArray(cards);
}

function shuffleArray(array) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
}

function renderBoard() {
  gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`; // Adjust grid size
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.addEventListener('click', () => flipCard(card));
    gameContainer.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length >= 2 || card.classList.contains('flipped')) return; // Limit to 2 flips or already flipped

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`; 
    checkMatch();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
  const totalPairs = (gridSize * gridSize) / 2;

  if (isMatch) {
    
    matchedPairs++;
    flippedCards = []; 

    // Check for win condition
    if (matchedPairs === totalPairs) {
      clearInterval(timerInterval); 
      setTimeout(() => {
        alert(`Congratulations! You won in ${moves} moves and ${timer} seconds!`);
      }, 500); 
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = ''; // Clear symbol
      secondCard.textContent = ''; // Clear symbol
      flippedCards = []; // Reset for next turn
    }, 1000); // 1 second delay
  }
}

function startTimer() {
  clearInterval(timerInterval); 
  timer = 0; 
  timerDisplay.textContent = `Time: ${timer}s`;

  timerInterval = setInterval(() => {
    timer++; 
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000); 
}

if (resetButton) {
    resetButton.addEventListener('click', initGame);
}

if (difficultySlider) {
    difficultySlider.addEventListener('change', initGame);
}

