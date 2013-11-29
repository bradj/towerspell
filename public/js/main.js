(function () {
    var cellWidth = 60;
    var cellHeight = 50;
    var numRows = 12;
    var numCols = 8;

    function Cell(x, y) {
        this.rect = new Kinetic.Rect({
                x: x,
                y: y,
                width: cellWidth,
                height: cellHeight,
                fill: '#eee',
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

        var stage = new Kinetic.Stage({
            container: 'board',
            width: cellWidth * numCols,
            height: cellHeight * numRows
        });

        // 8 x 12
        var layer = new Kinetic.Layer();
        var x, y = 0;

        // Draw board
        for (var ii = 0; ii < numRows; ii++) { // row
            y = ii * cellHeight;
            for (var zz = 0; zz < numCols; zz++) { // column
                x = zz * cellWidth;

                var cell = new Cell(x, y);
                layer.add(cell.rect);
                layer.add(cell.text);
            }
        }

        stage.add(layer);
        console.log('Board drawn');
    };

    window.onload = function() {
        console.log('loaded');

        var c = new Board();
    };

})();