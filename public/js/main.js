(function () {

    var cellWidth = 60;
    var cellHeight = 50;
    var numRows = 12;
    var numCols = 8;
    var cellColor = '#eee';
    var board;

    function Cell(x, y) {
        this.rect = new Kinetic.Rect({
                x: x,
                y: y,
                width: cellWidth,
                height: cellHeight,
                fill: cellColor,
                stroke: '#333',
                strokeWidth: 1,
                cornerRadius: 5
            });

        this.text = new Kinetic.Text({
            x: x + cellWidth / 2 - 10,
            y: y + cellHeight / 2 - 13,
            text: 'T',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            fontSize: 32,
            fill: '#666'
        });
    }

    function Board() {
        var that = this;

        var stage = new Kinetic.Stage({
            container: 'board',
            width: cellWidth * numCols,
            height: cellHeight * numRows
        });

        var layer = new Kinetic.Layer();
        layer.on('click', function(evt) {
            var rect = that.getCell(evt.targetNode).rect;
            rect.setFill(rect.boardClicked ? cellColor : 'blue');
            rect.boardClicked = rect.boardClicked != true;
            layer.draw();

            evt.cancelBubble = true;
        });

        var xPos, yPos = 0;
        var cells = [numCols];

        // Draw board
        for (var xx = 0; xx < numCols; xx++) { // rows
            xPos = xx * cellWidth;
            cells[xx] = [numRows];

            for (var yy = 0; yy < numRows; yy++) { // columns
                yPos = yy * cellHeight;

                var cell = new Cell(xPos, yPos);
                cell.rect.boardX = xx;
                cell.rect.boardY = yy;
                cell.text.boardX = cell.rect.boardX;
                cell.text.boardY = cell.rect.boardY;

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
    };

    window.onload = function() {
        console.log('loaded');

        board = new Board();
    };

})();