class Position{
    constructor(row,  column){
        this.row = row;
        this.column = column;
    }
}



class Tetromino{
    constructor(canvas, cellSize, shapes, initPosition, id){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.cellSize = cellSize;
        this.shapes = shapes;
        this.rotation = 0;
        this.initPosition = initPosition;
        this.position = new Position(this.initPosition.row, this.initPosition.column);
        this.id = id;
        this.color = color;
    }
    drawSquare(x,y,size,color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y, size, size);
    }
    drawTriangle(x1,y1,x2,y2,x3,y3, color){
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.lineTo(x3,y3);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    getColorPalette(id){
        const palette = {
            1: {
                rightTriangle: "#B5193B",
                leftTriangle: "#FFFFFF",
                square: "#EE1B2E"
            },
            2: {
                rightTriangle: "#FE5E02",
                leftTriangle: "#FFFFFF",
                square: "#FFDB01"
            },
            3: {
                rightTriangle: "#FE8601",
                leftTriangle: "#FFFFFF",
                square: "#FFDB01"
            },
            4: {
                rightTriangle: "#B5193B",
                leftTriangle: "#FFFFFF",
                square: "#EE1B2E"
            },
            5: {
                rightTriangle : "#49BDFF",
                leftTriangle : "#FFFFFF",
                square : "#2D97F7"
            },
            6: {
                rightTriangle : "#0000C9",
                leftTriangle : "#FFFFFF",
                square : "#0101F0"
            },
            7: {
                rightTriangle : "#8500D3",
                leftTriangle : "#FFFFFF",
                square : "#A000F1"
            }
            
        }
        return palette[id] || palette[1]
    }
    drawBlock(x,y,id){
        const margin = this.cellSize / 8;
       const palette = this.getColorPalette(id);
       
       this.drawTriangle(
        x,y,
        x+this.cellSize,y,
        x,y+this.cellSize,
        palette.leftTriangle
       );

       this.drawTriangle(
        x+this.cellSize,y,
        x+this.cellSize, y+this.cellSize,
        x, y+this.cellSize,
        palette.rightTriangle
       );

       this.drawSquare(
        x+margin,
        y+margin,
        this.cellSize - (margin*2),
        palette.square
       );
    }
    currentShape(){
        return this.shapes[this.rotation];
    }
    draw(grid){
        const shapes = this.currentShape();
        for(let i = 0; i<shapes.length; i++){
            const position = grid.getCoordinates(
                this.position.column + shape[i].column,
                this.position.row + shape[i].row,
            );
            this.drawBlock(position.x,position.y, this.id);
        }
    }
    currentPositions(){
        const positions = [];
        const shape = this.currentShape();
        for(let i = 0; i<shape.length; i++){
            positions.push(new Position(
                this.position.row + shape[i].row,
                this.position.column + shape[i].column
            ));
        }
        return positions;
    }
    move(row, column){
        this.position.row += row;
        this.position.column += column;
    }
    reset(){
        this.position = 0;
        this.position = new Position(this.initPosition.row, this.initPosition.column);
    }
}
//El como interectuan las figuras en el canva

//Ahora a dibujar las figuras

//Despues la designacion de colores de cada una de las figuras

//creacion de los te trominos
