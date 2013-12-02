var Board = function(stage, layer) {
    var that = this;

    var cells = [numCols];

    this.addRow = function() {
        for (var xx = 0, len = cells.length; xx < len; xx++)
        {
            var cell = new Cell(xx * cellWidth, (boardHeight - cellHeight));
            cell.setArrayPosition(xx, 0);

            layer.add(cell.rect);
            layer.add(cell.text);

            cells[xx].unshift(cell);
        }

        this.redrawboard();
    };

    this.generateBoard = function(endless) {
        var xPos, yPos = 0;
        var rows = endless ? numRows / 2 : numRows;

        // Draw board
        for (var xx = 0; xx < numCols; xx++) { // rows
            xPos = xx * cellWidth;
            cells[xx] = [rows];

            for (var yy = 0; yy < rows; yy++) { // columns
                yPos = (boardHeight - cellHeight) - (yy * cellHeight);

                var cell = new Cell(xPos, yPos);
                cell.setArrayPosition(xx, yy);

                layer.add(cell.rect);
                layer.add(cell.text);

                cells[xx][yy] = cell;
            }
        }

        stage.add(layer);
        console.log('Board drawn');
    };

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

    this.redrawboard = function() {
        var yPos = 0;

        for (var xx = 0; xx < numCols; xx++) { // rows
            for (var yy = 1, len = cells[xx].length; yy < len; yy++) { // columns
                yPos = cells[xx][yy].rect.getY() - cellHeight;

                cells[xx][yy].setYPosition(yPos);
                cells[xx][yy].setArrayPosition(xx, yy);
            }
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
};