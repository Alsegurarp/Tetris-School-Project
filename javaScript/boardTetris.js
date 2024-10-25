class BoardTetris extends Grid{
    constructor(canvas, rows, cols, cellSize, space){
        super(canvas, rows, cols, cellSize, space);
    }
    //Esta parte solo compara si en la consola hay un numero diferente a 0, para que de esa manera entienda que no está disponible.
    //Si es == 0, entonces es un espacio vacio - Ésto es de la matriz() 
    isInside(row, col){
        return row>=0 && row<this.rows && col>=0 && col<this.cols;
    }
    isEmpty(row, col){
        return this.isInside(row, col) && this.matriz[row][col] === 0;
    }
    //Compara si ésa fila está llena de algun numero diferente a 0, luego elimina ésa fila - Mas adelante se referenciará a clearRow() 
    //Pero basicamente es solamente es referenciarse a ésto
    isRowFull(row){
        return this.matriz[row].every(element => element !== 0);
    }
    isRowEmpty(row){
        return this.matriz[row].every(element => element === 0);
    }
    clearRow(row){
        this.matriz[row].fill(0);
    }
    moveRowDown(row, numRows){
        this.matriz[row + numRows] = this.matriz[row].slice();
        this.clearRow(row);
    }
    //Hacer puntaje en Tetris
    clearFullRows(){
        let cont = 0;
        for(let row = this.rows -1; row>=0; row--){
            if(this.isRowFull(row)){
                this.clearRow(row);
                cont++;
            } else if(cont > 0){
                this.moveRowDown(row, cont);
            }
        }
        return cont;
    }
    //Avisa si perdiste
    gameOver(){
        return !(this.isRowEmpty(0));
    }
}
//La modal que muestra los tetrominos siguientes (3)
class BoardNext extends Grid{
    constructor(canvas, rows, cols, cellSize, space, listTetrominos){
        super(canvas, rows, cols, cellSize, space);
        this.listTetrominos = listTetrominos;
        this.updateMatriz();
    }
    updateMatriz(){
        this.restartMatriz();
        let cont = 0;
        for(let i = 0; i<this.listTetrominos.length; i++){
            const shape = this.listTetrominos[i].currentShape();
            for(let j = 0; j<shape.length; j++){
                this.matriz[shape[j].row + cont][shape[j].column] = this.listTetrominos[i].id;
            }
            cont+=3;
        }
    }
}
//La modal que contiene la pieza 'HOLD'
class BoardHold extends Grid{
    constructor(canvas, rows, cols, cellSize, space){
        super(canvas, rows, cols, cellSize, space);
        this.tetromino = null;
        this.updateMatriz();
    }
    updateMatriz(){
        if(this.tetromino==null)return;
        this.tetromino.reset();
        this.restartMatriz();
        const shape = this.tetromino.currentShape();
        for(let i = 0; i < shape.length; i++){
            this.matriz[shape[i].row][shape[i].column] = this.tetromino.id;
        }
    }
    }