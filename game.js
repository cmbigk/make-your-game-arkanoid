const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const bricksContainer = document.getElementById("bricks-container");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");
const fpsElement = document.getElementById("fps");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");

let ballX, ballY;
let ballSpeedX = 3, ballSpeedY = -3;
let paddleX = 350;
let score = 0, lives = 3;
let gamePaused = false;
let gameTime = 60;
let bricks = [];

// FPS Counter
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;

// Initialize ball on paddle
function resetBall() {
    ballX = paddleX + 50;
    ballY = 440;
    ballSpeedX = 3 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = -3;
}

// Move paddle with keyboard
document.addEventListener("keydown", (event) => {
    if (gamePaused) return;
    if (event.key === "ArrowLeft" && paddleX > 0) {
        paddleX -= 50;
    }
    if (event.key === "ArrowRight" && paddleX < 700) {
        paddleX += 50;
    }
    paddle.style.left = `${paddleX}px`;
});

// Create bricks
function createBricks() {
    bricksContainer.innerHTML = "";
    bricks = [];

    for (let i = 0; i < 32; i++) {
        const brick = document.createElement("div");
        brick.classList.add("brick");
        bricksContainer.appendChild(brick);

        let row = Math.floor(i / 8);
        let col = i % 8;
        let xPos = col * 90;
        let yPos = row * 35;

        brick.style.left = `${xPos}px`;
        brick.style.top = `${yPos}px`;
    

        bricks.push({ element: brick, x: xPos, y: yPos, width: 80, height: 30, active: true });
    }
}
createBricks();

// Ball physics
function updateBall() {
    if (gamePaused) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision
    if (ballX <= 0 || ballX >= 785) ballSpeedX *= -1;
    if (ballY <= 0) ballSpeedY *= -1;

    // Paddle collision
    if (ballY + 15 >= 465 && ballX >= paddleX && ballX <= paddleX + 100) {
        if (ballSpeedY > 0) {
            ballSpeedY *= -1;
            ballY = 460;
        }
    }

    // Brick collision
    bricks.forEach((brick) => {
        if (brick.active) {
            if (
                ballX + 10 > brick.x && ballX - 10 < brick.x + brick.width &&
                ballY + 10 > brick.y && ballY - 10 < brick.y + brick.height
            ) {
                brick.active = false;
                brick.element.style.visibility = "hidden";
                ballSpeedY *= -1;
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
                checkWin();
            }
        }
    });

    // Lose life if ball falls
    if (ballY >= 485) {
        lives--;
        livesElement.textContent = `Lives: ${lives}`;
        checkGameOver();
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    calculateFPS();
    requestAnimationFrame(updateBall);
}

// FPS Calculation
function calculateFPS() {
    let now = performance.now();
    frameCount++;

    if (now - lastFrameTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFrameTime = now;
        fpsElement.textContent = `FPS: ${fps}`;
    }
}

// Check for Game Over
function checkGameOver() {
    if (lives === 0) {
        showPopup("Game Over! Try Again.");
    }
}

// Check for Win
function checkWin() {
    if (bricks.every(brick => !brick.active)) {
        showPopup("Congratulations! You Won!");
    }
}

function checkTime() {
    if (gameTime === 0) {
        showPopup("Time is Up! Try Again.");
    }
}




// Show Popup
function showPopup(message) {
    gamePaused = true;
    const popup = document.createElement("div");
    popup.innerHTML = `<p>${message}</p>`;
    
    popup.style.position = "fixed";
    popup.style.top = "35%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "grey";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    document.body.appendChild(popup);
}

// Restart Button
restartBtn.addEventListener("click", () => {
    location.reload();
});

// Pause Button
pauseBtn.addEventListener("click", () => {
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? "Continue" : "Pause";
    if (!gamePaused) requestAnimationFrame(updateBall);
});

// Timer


setInterval(() => {
  if (!gamePaused) {
    if (gameTime > 0) {
      gameTime--; // Decrease time by 1 second
      const minutes = Math.floor(gameTime / 60); // Get minutes
      const seconds = gameTime % 60; // Get seconds
      timerElement.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Format time
    } else {
        checkTime();
      gamePaused = true; // Pause the game
    }
  }
}, 1000);


// Start game
resetBall();
requestAnimationFrame(updateBall);
