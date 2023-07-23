import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, snakeIntersection, getSnakeHead } from './snake.js'

import { update as updateFood, draw as drawFood } from './food.js'

import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
let gameOver = false;

function gameLoop(currentTime) {

    if(gameOver) {
        if(confirm("You Lost try again?")) {
            window.location = "/";
        }
        return 
    };

    window.requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();

};

window.requestAnimationFrame(gameLoop);


const update = () => {
    updateSnake();
    updateFood();
    checkForDeath();
};

const draw = () => {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
};


function checkForDeath () {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};