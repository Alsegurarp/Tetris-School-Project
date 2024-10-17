import { Tetromino } from './tetromino.js'

export class Grid{
    constructor(canvas, rows, cols, cellSize, space) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.space = space;
        this.matriz = [];
        this.restartMatriz(); /* Para que inicie llena de 0 la matriz*/

        this.canvas.width = this.cols * this.cellSize + (this.space*this.cols);
        this.canvas.height = this.rows * this.cellSize + (this.space*this.rows);

        this.block = new Tetromino(this.canvas, this.cellSize);
    }
    restartMatriz(){
        for(let r = 0; r < this.rows; r++){
            this.matriz[r] = [];
            for(let c = 0; c < this.cols; c++){
                this.matriz[r][c] = 0;
            }
        }
    }
    drawSquare(x,y,side,color,borderColor){
        const bordeSize = side / 10;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,side,side);

        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = bordeSize;
        this.ctx.strokeRect(x+bordeSize/2, y+bordeSize/2, side - bordeSize, side - bordeSize);
    } /* Metodo que indica el eje X, Y, lado, color y el color del border dentro de la figura */
    getCoordinates(col, row){
        return {x: col * (this.cellSize+this.space), y: row * (this.cellSize+this.space)}
    }/*Nos dará las coordenadas en pixeles dentro de nuestra matriz y tablero */
    draw(){
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const position = this.getCoordinates(c,r);
                if(this.matriz[r][c] !== 0){
                    this.block.drawBlock(position.x, position.y,this.matriz[r][c]);
                }
                else {
                    this.drawSquare(position.x, position.y, this.cellSize, "000", "#303030");
                }
            }
        }
        this.printMatriz();
    } /* Metodo para dibujar las filas*/
    printMatriz(){
        let text = "";
        this.matriz.forEach((row) => {
            text += row.join(" ") + "\n";
        });
        console.log(text);
    }
/* printMatriz para que se pinte en la consola */
}
/* Contenedor padre de, aqui se debe aclarar el tamaño de cada una de las celdas, columnas, etc - tablero*/
/* Space se refiere al espacio dentro del tablero*/
/* ctx = contexto, lo necesitamos para dibujar dentro del canva */