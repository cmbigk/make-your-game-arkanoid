const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const bricksContainer = document.getElementById("bricks-container");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");
const fpsElement = document.getElementById("fps");
const pauseBtn = document.getElementById("pause-btn");

let ballX, ballY;
let ballSpeedX = 3, ballSpeedY = -3;
let paddleX = 350;
let score = 0, lives = 3;
let gamePaused = false;
let gameTime = 0;
let bricks = [];

// FPS Counter
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;

// Initialize ball on paddle
function resetBall() {
    ballX = paddleX + 50;  // Start directly above the paddle
    ballY = 440;  // Slightly above the paddle
    ballSpeedX = 3 * (Math.random() > 0.5 ? 1 : -1); // Random left or right
    ballSpeedY = -3;
}

// Move paddle with keyboard
document.addEventListener("keydown", (event) => {
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

    // Paddle collision (Fixed)
    if (
        ballY + 15 >= 465 &&  // Ball reaches paddle height
        ballX >= paddleX && 
        ballX <= paddleX + 100
    ) {
        if (ballSpeedY > 0) {  // Prevent multiple bounces
        ballSpeedY *= -1;
        ballY = 460; // Prevent sticking
    }
}

    // Brick collision (Improved)
    bricks.forEach((brick) => {
        if (brick.active) {
            if (
                ballX + 10 > brick.x && ballX - 10 < brick.x + brick.width &&  // X-axis overlap
                ballY + 10 > brick.y && ballY - 10 < brick.y + brick.height    // Y-axis overlap
            ) {
                brick.active = false;
                brick.element.style.visibility = "hidden";
                ballSpeedY *= -1;
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
            }
        }
    });

    // Lose life if ball falls
    if (ballY >= 485) {
        lives--;
        livesElement.textContent = `Lives: ${lives}`;
        if (lives === 0) {
            alert("Game Over!");
            location.reload();
        }
        resetBall();  // Ball now resets correctly above the paddle
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

// Pause and Continue button logic
pauseBtn.addEventListener("click", () => {
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? "Continue" : "Pause";
    if (!gamePaused) {
        requestAnimationFrame(updateBall);
    }
});

// Timer Function
setInterval(() => {
    if (!gamePaused) {
        gameTime++;
        timerElement.textContent = `Time: ${gameTime}`;
    }
}, 1000);

// Fix Pause Button Position
pauseBtn.style.position = "absolute";
pauseBtn.style.top = "520px";  // Move it below the game area
pauseBtn.style.left = "350px"; // Center it

// Start game
resetBall();
requestAnimationFrame(updateBall);
