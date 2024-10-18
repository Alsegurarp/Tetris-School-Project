import { TetrominoBag } from './tetromino.js';
import { BoardTetris } from './boardTetris.js'

export class Game{
    constructor(canvas, rows, cols, cellSize, space){
        this.boardTetris = new  BoardTetris(canvas, rows, cols, cellSize, space);
        this.tetrominoBag = new TetrominoBag(canvas, cellSize);
        this.currentTetromino = this.tetrominoBag.nextTetromino();
        this.keyboard();
    }
    update(){
        this.boardTetris.draw();
        this.currentTetromino.draw(this.boardTetris);
    }
    blockedTetromino(){
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for(let i = 0; i<tetrominoPositions.length; i++){
            if(this.boardTetris.isEmpty(tetrominoPositions[i].row, tetrominoPositions[i].column)){
                return true;
            }
            else {
                return false;
            }
        } 
    }
    moveTetromminoLeft(){
        this.currentTetromino.move(0, -1);
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,1);
        }}
    moveTetromminoRight(){
        this.currentTetromino.move(0,1);
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,-1);
        }}
    moveTetromminoDown(){
        this.currentTetromino.move(1,0);
        if(this.blockedTetromino()){
            this.currentTetromino.move(-1,0);
        }}
    rotationTetrominoCW(){
        this.currentTetromino.rotation++;
        if(this.currentTetromino.rotation > this.currentTetromino.shapes.length-1){
            this.currentTetromino.rotation = 0;
        }
        if(this.blockedTetromino()){
            this.rotationTetrominoCCW();
        }
    }
    rotationTetrominoCCW(){
        this.currentTetromino.rotation--;
        if(this.currentTetromino.rotation<0){
            this.currentTetromino.rotation = this.currentTetromino.shapes.length - 1;
        }
        if(this.blockedTetromino()){
            this.rotationTetrominoCW();
        }
    }
    //Creacion de los eventos para escuahr al tablero de computadora - Ahora se hara con flecha pero debo de probar como hacerlo con pantalla de celular
    keyboard(){
        window.addEventListener("keydown", (evt) => {
            if(evt.key === "ArrowLeft"){
                this.moveTetromminoLeft();
            }
            if(evt.key === "ArrowRight"){
                this.moveTetromminoRight();
            }
            if(evt.key === "ArrowDown"){
                this.moveTetromminoDown();
            }
            if(evt.key === "ArrowUp"){
                this.rotationTetrominoCW();
            }
        })
    }

}
