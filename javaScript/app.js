const canvasTetris = document.getElementById("canvas-tetris");
const canvasNext = document.getElementById("canvas-next");
const canvasHold = document.getElementById("canvas-hold");
const score = document.getElementById("score");
const menu = document.getElementById("menu");
const btnMenu = document.getElementById("btn-start");

const buttonUp = document.getElementById("buttonUp");
const buttonLeft = document.getElementById("buttonLeft");
const buttonDown = document.getElementById("buttonDown");
const buttonRight = document.getElementById("buttonRight");

const buttonDrop = document.getElementById("buttonDrop");
const buttonHold = document.getElementById("buttonHold");

const rows = 20;
const cols = 10;
const cellSize = 26;
const space = 2;

const game = new Game(canvasTetris, rows, cols, cellSize, space, canvasNext, canvasHold);

function update(){
    if(game.gameOver){
        menu.style.display = "flex";
    }else{
        game.update();
        score.innerHTML = game.score;
    }
    requestAnimationFrame(update);
}

btnMenu.addEventListener("click", () => {
    setTimeout(() => {
    menu.style.display = "none";
    game.reset();
    score.innerHTML = game.score;
    }, 100)
})



update();