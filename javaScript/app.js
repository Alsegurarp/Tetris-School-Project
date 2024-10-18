import { Game } from "./game";

const canvasTetris = document.getElementById("canvas-tetris");
const rows = 20;
const cols = 10;
const cellSize = 26;
const space = 2;

const game = new Game(canvasTetris, rows, cols, cellSize, space);

function update(){
    game.update();
    requestAnimationFrame(update);
}
update();

