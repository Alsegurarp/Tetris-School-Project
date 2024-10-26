//Declaracion del juego, como se conecta - Las teclas y todo 
//El porqué se colocan keys en 'false' es para que al ser activadas no continuen con la accion que deberian hacer <Pero solamente una vez>
//Pude haber hecho un toggle, pero tambien está ésta opción.
class Game{
    constructor(canvas, rows, cols, cellSize, space, canvasNext, canvasHold){
        this.boardTetris = new BoardTetris(canvas, rows, cols, cellSize, space);
        this.tetrominosBag = new TetrominosBag(canvas, cellSize);
        this.currentTetromino = this.tetrominosBag.nextTetromino();
        this.keyboard();
        this.keys = {up:false, down:false};

        this.lastTime = 0;
        this.lastTime2 = 0;

        this.next = new BoardNext(canvasNext,9, 5, cellSize, space, this.tetrominosBag.getThreeNextTetromino());
        this.hold = new BoardHold(canvasHold, 4, 5, cellSize, space);
        this.canHold = true;

        this.score = 0;
        this.gameOver = false;
    }

    update(){
        let currentTime = Date.now();
        let deltaTime = currentTime - this.lastTime;
        let deltaTime2 = currentTime - this.lastTime2;
        this.next.draw2();

        if(deltaTime >= 1000){
            this.autoMoveTetrominoDown();
            this.lastTime = currentTime;
        }
        if(deltaTime2 >= 50){
        this.boardTetris.draw();
        this.drawTetrominoGhost();
        this.currentTetromino.draw(this.boardTetris);

        this.next.draw2();
        this.hold.draw2();

        if(this.keys.down){
            this.moveTetrominoDown();
        }
        this.lastTime2 = currentTime;
        }
    }

    autoMoveTetrominoDown(){
        this.currentTetromino.move(1,0);
        if(this.blockedTetromino()){
            this.currentTetromino.move(-1,0);
            this.placeTetromino();
    }}
    blockedTetromino(){
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for(let i = 0; i<tetrominoPositions.length; i++){
            if(!this.boardTetris.isEmpty(tetrominoPositions[i].row, tetrominoPositions[i].column)){
                return true;
            }
        }
        return false;
        }
    moveTetrominoLeft(){
        this.currentTetromino.move(0, -1);
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,1);
        }
    }
    moveTetrominoRight(){
        this.currentTetromino.move(0,1);
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,-1);
        }
    }
    moveTetrominoDown(){
        this.currentTetromino.move(1,0);
        if(this.blockedTetromino()){
            this.currentTetromino.move(-1,0);
        }
    }
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

//Creacion de los eventos para escuchar al tablero de computadora - Ahora se hara con flecha pero debo de probar como hacerlo con pantalla de celular
//Posicionar el tetromino en el tablero 
//Puntaje que se da cuando ganas - Puntaje que te da
    placeTetromino(){
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for(let i = 0; i<tetrominoPositions.length; i++){
            this.boardTetris.matriz
                [tetrominoPositions[i].row]
                [tetrominoPositions[i].column] = this.currentTetromino.id;
        }
        
        this.score += this.boardTetris.clearFullRows() *5;
        
        //si hay gameOver - Entonces true, tarda 0.5seg en salir la alerta

        if(this.boardTetris.gameOver()){
            setTimeout(() => {
                this.gameOver = true;
            }, 500);
            
            return true;
        }
        else{
            this.currentTetromino = this.tetrominosBag.nextTetromino();
            this.next.listTetrominos = this.tetrominosBag.getThreeNextTetromino();
            this.next.updateMatriz();
            this.canHold = true;
        }
    }
    //Solamente pasa la pieza que estas usando, le suma los espacios que le falta hasta que se encuentre un espacio ocupado y ahí muestra la pieza
    //Si algun espacio de la matriz está ocupado, toma el que está por encima
    dropDistance(position){
        let distance = 0;
        while(this.boardTetris.isEmpty(position.row + distance + 1, position.column)){
            distance++;
        }
        return distance;
    }
    tetrominoDropDistance(){
        let drop = this.boardTetris.rows;
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for(let i = 0; i<tetrominoPositions.length; i++){
            drop = Math.min(drop, this.dropDistance(tetrominoPositions[i]))
        }
        return drop;
    }
    //Tetromino dónde caerá la pieza 
    drawTetrominoGhost(){
        const dropDistance = this.tetrominoDropDistance();
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for(let i = 0; i<tetrominoPositions.length; i++){
            let position = this.boardTetris.getCoordinates(
                tetrominoPositions[i].column,
                tetrominoPositions[i].row + dropDistance
            )
            this.boardTetris.drawSquare(position.x, position.y, this.boardTetris.cellSize, "000000", "white", 20);
        }
    }
    //Al dar click, en inmediato pasa a la columna que se encuentre con el espacio disponible
    //Todo espacio en la matriz(plano) que sea diferente a 0, de no ser el caso, entonces irá hasta el fondo de la matriz
    dropBlock(){
        this.currentTetromino.move(this.tetrominoDropDistance(), 0);
        this.placeTetromino();
    }
    //Compara si hay un tetromino en Hold, pero antes de eso declara que es nulo, por lo que no contiene nada al inicio
    //Despues instrucciones del como tomará el tetromino en turno y usa el metodo nextTetromino() - Asi tiene que usar 
    //Despues al usar esto en una ocasion, returna, por lo que ya no puedes usarla hasta que posiciones el tetromino que estás
    //Después de posicionarlo en la matriz puedes usar hold de nuevo
    holdTetromino(){
        if(!this.canHold) return;
        if(this.hold.tetromino === null){
            this.hold.tetromino = this.currentTetromino;
            this.currentTetromino = this.tetrominosBag.nextTetromino();
        } else{
            [this.currentTetromino, this.hold.tetromino] = [this.hold.tetromino, this.currentTetromino];
        }
        this.hold.updateMatriz();
        this.canHold = false;
    }
    reset(){
        this.boardTetris.restartMatriz();
        this.score = 0;
        this.hold.tetromino = null;
        this.tetrominosBag.reset();
        this.currentTetromino = this.tetrominosBag.nextTetromino();
        this.hold.drawBackground();
        this.canHold = true;
        this.hold.restartMatriz();
        this.next.restartMatriz();
        this.next.listTetrominos = this.tetrominosBag.getThreeNextTetromino();
        this.next.updateMatriz();
        this.next.draw2();
        this.gameOver = false;
    }
    keyboard(){
        window.addEventListener("keydown",(evt)=>{
            if(evt.key === "ArrowLeft"){
                this.moveTetrominoLeft();
            }
            if(evt.key === "ArrowRight"){
                this.moveTetrominoRight();
            }
            if(evt.key === "ArrowDown"){
                this.moveTetrominoDown();
                this.keys.down = true;
            }
            if(evt.key === "ArrowUp" && !this.keys.up){
                this.rotationTetrominoCW();
                this.keys.up = true;
            }
            if(evt.key === "c" || evt.key === "C"){
                this.holdTetromino();
            }
        });
        window.addEventListener("keyup", evt => {
            if(evt.key === "ArrowDown"){
                this.keys.down = false;
            }
            if(evt.key === "ArrowUp"){
                this.keys.up = false;
            }
        })
        window.addEventListener('keydown', () => {
            if(event.code === 'Space' && !this.gameOver){
                this.dropBlock();
            }
            
        });
    }
}


