var Board = function(stage, layer) {
    var that = this;

    var xPos, yPos = 0;
    var cells = [numCols];

    // Draw board
    for (var xx = 0; xx < numCols; xx++) { // rows
        xPos = xx * cellWidth;
        cells[xx] = [numRows];

        for (var yy = 0; yy < numRows; yy++) { // columns
            yPos = (boardHeight - cellHeight) - (yy * cellHeight);

            var cell = new Cell(xPos, yPos);
            // I do this because I am listening for events off of the text and rect.
            // I am sure there is a better way... Don't know what that way is yet.
            cell.boardX = xx;
            cell.boardY = yy;
            cell.rect.boardX = cell.boardX;
            cell.rect.boardY = cell.boardY;
            cell.text.boardX = cell.boardX;
            cell.text.boardY = cell.boardY;

            layer.add(cell.rect);
            layer.add(cell.text);

            cells[xx][yy] = cell;
        }
    }

    stage.add(layer);
    console.log('Board drawn');

    // Returns the cell based on board X and Y position.
    this.getCell = function(shape) { return cells[shape.boardX][shape.boardY]; };

    // Removes the cell provided from the board
    this.removeCell = function(cell) {
        cells[cell.boardX].splice(cell.boardY, 1);
        cell.rect.destroy();
        cell.text.destroy();

        for (var ii = cell.boardY, len = cells[cell.boardX].length; ii < len; ii++ ) {
            var c = cells[cell.boardX][ii];
            c.boardY = ii;
            c.rect.boardY = ii;
            c.text.boardY = ii;
            c.rect.setY(c.rect.getY() + cellHeight);
            c.text.setY(c.text.getY() + cellHeight);
        }
    };

    // Removes the collection of cells provided from the board
    this.removeWord = function(cells) {
        for (var ii = 0, len = cells.length; ii < len; ii++) this.removeCell(cells[ii]);
    };

    // Resets the cells provided
    this.resetCells = function(cells) {
        for (var ii = 0, len = cells.length; ii < len; ii++)
            cells[ii].reset();
    };

    this.setLastClicked = function(cell) {
        
    };
};