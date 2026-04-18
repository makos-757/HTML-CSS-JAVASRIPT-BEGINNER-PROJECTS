const playBoard = document.querySelector(".play-board");
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval;
let GameOver = false;
let gameSpeed = 125;
let isPaused = false;
let foodType = 'normal'; // normal, golden, icy
let gamesPlayed = localStorage.getItem("gamesPlayed") || 0;
// Audio Context for sound effects
let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
};
const playSound = (type) => {
    if (!audioCtx) return;  
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    switch(type) {
        case 'eat':
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
            break;
        case 'golden':
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.15);
            break;
        case 'icy':
            oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.2);
            break;
        case 'gameover':
            oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.5);
            break;
    }
};

const getRandomFoodType = () => {
    const rand = Math.random();
    if (rand < 0.1) return 'golden'; // 10% chance for golden food (5 points)
    if (rand < 0.2) return 'icy';   // 10% chance for icy food (3 points)
    return 'normal';                // 80% chance for normal food (1 point)
};

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    foodType = getRandomFoodType();
    
    // Make sure food doesn't spawn on snake
    for (let segment of snakeBody) {
        if (foodX === segment[0] && foodY === segment[1]) {
            changeFoodPosition();
            return;
        }
    }
    if (foodX === snakeX && foodY === snakeY) {
        changeFoodPosition();
    }
};
const changeDirection = (e) => {
    if (GameOver || isPaused) return;
    
    // Initialize audio on first key press
    initAudio();  
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        togglePause();
    }
};
const togglePause = () => {
    if (GameOver) return;  
    if (isPaused) {
        resumeGame();
    } else {
        isPaused = true;
        clearInterval(gameInterval);
        document.getElementById("pauseModal").style.display = "flex";
    }
};
const resumeGame = () => {
    isPaused = false;
    document.getElementById("pauseModal").style.display = "none";
    gameInterval = setInterval(initGame, gameSpeed);
};
const quitToMenu = () => {
    isPaused = false;
    GameOver = false;
    document.getElementById("pauseModal").style.display = "none";
    document.getElementById("gameOverModal").style.display = "none";
    document.getElementById("difficultyModal").style.display = "flex";
    playBoard.innerHTML = '';
};
const gameOver = () => {
    clearInterval(gameInterval);
    GameOver = true;
    playSound('gameover');  
    // Update games played
    gamesPlayed++;
    localStorage.setItem("gamesPlayed", gamesPlayed);
    document.getElementById("finalScore").textContent = score;
    document.getElementById("gameOverModal").style.display = "flex";
};
const restartGame = () => {
    snakeX = 5;
    snakeY = 10;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    GameOver = false;
    isPaused = false;  
    const scoreElement = document.querySelector(".score");
    scoreElement.textContent = `Score: ${score}`;
    scoreElement.classList.remove('score-pop');
    document.querySelector(".highscore").textContent = `High Score: ${highScore}`;
    document.getElementById("gameOverModal").style.display = "none";
    document.getElementById("difficultyModal").style.display = "flex";
};
const startGame = (difficulty) => {
    // Initialize audio on game start
    initAudio();  
    switch (difficulty) {
        case 'easy':
            gameSpeed = 200;
            break;
        case 'medium':
            gameSpeed = 125;
            break;
        case 'hard':
            gameSpeed = 75;
            break;
    }
    document.getElementById("difficultyModal").style.display = "none";
    changeFoodPosition();
    gameInterval = setInterval(initGame, gameSpeed);
};
const animateScore = () => {
    const scoreElement = document.querySelector(".score");
    scoreElement.classList.remove('score-pop');
    void scoreElement.offsetWidth; // Trigger reflow
    scoreElement.classList.add('score-pop');
};
const initGame = () => {
    if (isPaused) return;
    let tailX = snakeBody.length ? snakeBody[snakeBody.length - 1][0] : snakeX;
    let tailY = snakeBody.length ? snakeBody[snakeBody.length - 1][1] : snakeY;
    snakeX += velocityX;
    snakeY += velocityY;
    if (snakeX < 1 || snakeX > 30 || snakeY < 1 || snakeY > 30) {
        gameOver();
        return;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver();
            return;
        }
    }
    if (snakeX === foodX && snakeY === foodY) {
        // Add points based on food type
        switch(foodType) {
            case 'golden':
                score += 5;
                playSound('golden');
                break;
            case 'icy':
                score += 3;
                playSound('icy');
                break;
            default:
                score += 1;
                playSound('eat');
        }
        changeFoodPosition();
        snakeBody.push([tailX, tailY]);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        const scoreElement = document.querySelector(".score");
        scoreElement.textContent = `Score: ${score}`;
        animateScore();   
        document.querySelector(".highscore").textContent = `High Score: ${highScore}`;
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX - velocityX, snakeY - velocityY];
    }
    // Generate HTML with food type class
    let foodClass = 'food';
    if (foodType === 'golden') foodClass += ' golden';
    else if (foodType === 'icy') foodClass += ' icy';
    let htmlMarkup = `<div class="${foodClass}" style='grid-area: ${foodY} / ${foodX}'></div>`;
    htmlMarkup += `<div class="head" style='grid-area: ${snakeY} / ${snakeX}'></div>`;
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="body" style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    }
    playBoard.innerHTML = htmlMarkup;
};
// Touch controls for mobile
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    initAudio();
}, { passive: true });
document.addEventListener('touchend', (e) => {
    if (GameOver || isPaused) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const minSwipe = 30;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (Math.abs(diffX) > minSwipe) {
            if (diffX > 0 && velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            } else if (diffX < 0 && velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
        }
    } else {
        // Vertical swipe
        if (Math.abs(diffY) > minSwipe) {
            if (diffY > 0 && velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            } else if (diffY < 0 && velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
        }
    }
}, { passive: true });
// Keyboard controls
document.addEventListener('keydown', changeDirection);
// Initialize high score display
document.querySelector(".highscore").textContent = `High Score: ${highScore}`;
// Show difficulty selection modal
document.getElementById("difficultyModal").style.display = "flex";
