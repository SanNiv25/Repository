// script.js

let cards = [];
let timerText = document.getElementById('timerText');
let scoreText = document.getElementById('scoreText');
let initialScore = 50;
let mistakePenalty = -35;
let timer = 0;
let score = 0;
let targetScore = 230;
let maxTime = 30;
let selectedCards = [];
let isCheckingPair = false;
let gameTimer;

function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
    images.sort(() => 0.5 - Math.random());

    images.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imgSrc;

        const coverIcon = document.createElement('img');
        coverIcon.src = 'Heartless.png';
        coverIcon.classList.add('cover-icon');
        card.appendChild(coverIcon);

        const actualImg = document.createElement('img');
        actualImg.src = imgSrc;
        actualImg.classList.add('actual-image');
        card.appendChild(actualImg);

        card.addEventListener('click', () => onCardClick(card));

        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function startGame() {
    revealCards();
    setTimeout(hideCards, 2000);
    startTimer();
}

function revealCards() {
    cards.forEach(card => {
        card.querySelector('.actual-image').style.display = 'block';
        card.querySelector('.cover-icon').style.display = 'none';
    });
}

function hideCards() {
    cards.forEach(card => {
        card.querySelector('.actual-image').style.display = 'none';
        card.querySelector('.cover-icon').style.display = 'block';
        card.classList.add('covered');
    });
}

function startTimer() {
    gameTimer = setInterval(() => {
        timer++;
        updateTimerDisplay(timer);
    }, 1000);
}

function updateScore(isPair) {
    if (isPair) {
        score += initialScore;
    } else {
        score += mistakePenalty;
    }
    updateScoreDisplay(score);
}

function endGame() {
    clearInterval(gameTimer);
    const result = document.getElementById('result');
    const resultGif = document.getElementById('resultGif');
    const resultText = document.getElementById('resultText');
    
    result.style.display = 'flex';
    if (score >= targetScore && timer <= maxTime) {
        resultGif.src = 'youwin.gif';
        resultText.textContent = 'You Win';
    } else {
        resultGif.src = 'gameover.gif';
        resultText.textContent = 'Game Over';
    }
}

function updateTimerDisplay(time) {
    timerText.textContent = `Tempo: ${time}`;
}

function updateScoreDisplay(score) {
    scoreText.textContent = `Pontuação: ${score}`;
}

function onCardClick(card) {
    if (isCheckingPair || !card.classList.contains('covered')) return;
    card.querySelector('.actual-image').style.display = 'block';
    card.querySelector('.cover-icon').style.display = 'none';
    card.classList.remove('covered');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        isCheckingPair = true;
        setTimeout(checkPair, 1000);
    }
}

function checkPair() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.image === card2.dataset.image) {
        updateScore(true);
        if (cards.every(card => !card.classList.contains('covered'))) {
            endGame();
        }
    } else {
        card1.querySelector('.actual-image').style.display = 'none';
        card2.querySelector('.actual-image').style.display = 'none';
        card1.querySelector('.cover-icon').style.display = 'block';
        card2.querySelector('.cover-icon').style.display = 'block';
        card1.classList.add('covered');
        card2.classList.add('covered');
        updateScore(false);
    }
    selectedCards = [];
    isCheckingPair = false;
}

document.addEventListener('DOMContentLoaded', () => {
    createGameBoard();
    startGame();
});
