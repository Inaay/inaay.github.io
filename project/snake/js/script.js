const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;
const tileSize = 20;
let snake = [
    { x: 9, y: 9 },
    { x: 8, y: 9 },
    { x: 7, y: 9 }
];
let direction = 'right';
let food = getRandomFoodPosition();
let score = 0;
let speed = 100;
let intervalId;
let gameState = 'start';

document.getElementById('startBtn').addEventListener('click', function () {
    startGame();
});

document.getElementById('restartBtn').addEventListener('click', function () {
    restartGame();
});

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65:
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 87:
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 68:
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 83:
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
    }
});

const leftBtn = document.getElementById('leftBtn');
const upBtn = document.getElementById('upBtn');
const rightBtn = document.getElementById('rightBtn');
const downBtn = document.getElementById('downBtn');

leftBtn.addEventListener('click', function () {
    if (direction !== 'right') {
        direction = 'left';
    }
});

upBtn.addEventListener('click', function () {
    if (direction !== 'down') {
        direction = 'up';
    }
});

rightBtn.addEventListener('click', function () {
    if (direction !== 'left') {
        direction = 'right';
    }
});

downBtn.addEventListener('click', function () {
    if (direction !== 'up') {
        direction = 'down';
    }
});

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    canvas.style.display = 'block';
    intervalId = setInterval(gameLoop, speed);
    document.getElementById('mobileControls').style.display = 'flex';
}

function restartGame() {
    snake = [
        { x: 9, y: 9 },
        { x: 8, y: 9 },
        { x: 7, y: 9 }
    ];
    direction = 'right';
    food = getRandomFoodPosition();
    score = 0;
    document.getElementById('score').innerHTML = score;
    document.getElementById('restartScreen').style.display = 'none';
    canvas.style.display = 'block';
    intervalId = setInterval(gameLoop, speed);
}

function gameLoop() {
    moveSnake();
    if (checkCollisions()) {
        endGame();
        return;
    }
    if (checkFood()) {
        score++;
        document.getElementById('score').innerHTML = score;
        food = getRandomFoodPosition();
        speed -= 5;
        clearInterval(intervalId);
        intervalId = setInterval(gameLoop, speed);
    }
    drawGame();
}

function moveSnake() {
    let newHead = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'left':
            newHead.x--;
            break;
        case 'up':
            newHead.y--;
            break;
        case 'right':
            newHead.x++;
            break;
        case 'down':
            newHead.y++;
            break;
    }
    snake.unshift(newHead);
    if (snake[0].x === food.x && snake[0].y === food.y) {
        return;
    }
    snake.pop();
}

function checkCollisions() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width / tileSize) {
        return true;
    }
    if (snake[0].y < 0 || snake[0].y >= canvas.height / tileSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function checkFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        return true;
    }
    return false;
}

function endGame() {
    clearInterval(intervalId);
    canvas.style.display = 'none';
    document.getElementById('points').style.display = 'block';
    document.getElementById('score').innerHTML = score;
    document.getElementById('restartScreen').style.display = 'block';
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#6be06b';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize, tileSize);
    }
    ctx.fillStyle = '#ff8080';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function getRandomFoodPosition() {
    let x = Math.floor(Math.random() * (canvas.width / tileSize));
    let y = Math.floor(Math.random() * (canvas.height / tileSize));
    for (let i = 0; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            return getRandomFoodPosition();
        }
    }
    return { x: x, y: y };
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'a':
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 's':
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
        case 'd':
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
    }
});

startGame();