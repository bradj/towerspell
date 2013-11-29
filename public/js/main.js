(function () {

    var cellWidth = 60;
    var cellHeight = 50;
    var numRows = 12;
    var numCols = 8;
    var cellColor = '#8ABDF2';
    var cellStrokeColor = '#2D649D';
    var cellSelectColor = '#7B98B6';
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
                yPos = yy * cellHeight;

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

        this.getCell = function(shape) { return cells[shape.boardX][shape.boardY]; };
        this.clearboard = function() {
            for (var ii = 0, len = cells.length; ii < len; ii++) {
                for (var zz = 0, len2 = cells[ii].length; zz < len2; zz++) {
                    cells[ii][zz].rect.setFill(cellColor);
                    cells[ii][zz].rect.boardClicked = false;
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
            width: cellWidth * numCols,
            height: cellHeight * numRows
        });

        var layer = new Kinetic.Layer();
        layer.on('click', function(evt) {
            var cell = board.getCell(evt.targetNode);

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