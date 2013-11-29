(function () {

    var cellWidth = 50;
    var cellHeight = 50;
    var numRows = 12;
    var numCols = 8;
    var boardHeight = cellHeight * numRows;
    var boardWidth = cellWidth * numCols;
    var cellColor = '#333';
    var cellStrokeColor = '#A4ACE2';
    var cellSelectColor = '#2ABA1B';
    var textColor = '#fff';
    var game;

    function Cell(x, y) {
        this.rect = new Kinetic.Rect({
                x: x,
                y: y,
                width: cellWidth,
                height: cellHeight,
                fill: cellColor,
                stroke: cellStrokeColor,
                strokeWidth: 1
            });

        this.text = new Kinetic.Text({
            x: x + cellWidth / 2 - 10,
            y: y + cellHeight / 2 - 13,
            text: 'T',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            fontSize: 32,
            fill: textColor
        });

        this.reset = function() { this.rect.setFill(cellColor); };
        this.clicked = function() { this.rect.setFill(cellSelectColor); };
    };

    function Board(stage, layer) {
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

        this.removeWord = function(cells) {
            for (var ii = 0, len = cells.length; ii < len; ii++) this.removeCell(cells[ii]);
        };

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

            layer.draw();
        };

        this.getCell = function(shape) { return cells[shape.boardX][shape.boardY]; };
        this.clearboard = function() {
            for (var xx = 0, len = cells.length; xx < len; xx++) {
                for (var yy = 0, len2 = cells[xx].length; yy < len2; yy++) {
                    cells[xx][yy].rect.setFill(cellColor);
                    cells[xx][yy].rect.boardClicked = false;
                }
            }

            layer.draw();
        };

        this.resetCells = function(arr) {
            for (var ii = 0, len = arr.length; ii < len; ii++)
                arr[ii].reset();
        };
    };

    function Game() {
        var that = this;

        var word = [];

        var stage = new Kinetic.Stage({
            container: 'board',
            width: boardWidth,
            height: boardHeight
        });

        var layer = new Kinetic.Layer();
        layer.on('click', function(evt) {
            var cell = board.getCell(evt.targetNode);
            console.log(cell.boardX + ', ' + cell.boardY);

            if (!that.isClickAllowed(cell)) return;

            var rect = cell.rect;
            var wordidx = cell.wordidx;
            cell.clicked();

            if (wordidx != null) {
                var cellsToReset = word.slice(wordidx);
                that.resetClickedState(cellsToReset);
                word = word.length == 1 ? [] : word.slice(0, wordidx);
            }
            else {
                word.push(cell);
                cell.wordidx = word.length - 1;
            }

            if (word.length >= 5) {
                board.removeWord(word);
                word = [];
            }

            layer.draw();

            evt.cancelBubble = true;
        });

        this.resetClickedState = function(arr) {
            for (var ii = 0, len = arr.length; ii < len; ii++) {
                var cell = arr[ii];
                cell.wordidx = null;
                cell.reset();
            }
        };

        this.isClickAllowed = function(cell) {
            if (word.length == 0 || cell.wordidx != null) return true;

            var lastcell = word[word.length - 1];

            return (Math.abs(lastcell.boardX - cell.boardX) <= 1 && Math.abs(lastcell.boardY - cell.boardY) <= 1);
        };

        var board = new Board(stage, layer);
    };

    window.onload = function() {
        console.log('loaded');

        game = new Game();
    };

})();