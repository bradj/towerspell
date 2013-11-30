var Cell = function(x, y) {
    var gen = new Generator();

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
        y: y + cellHeight / 2 - 15,
        x: x,
        width: cellWidth,
        height: cellHeight,
        text: gen.generate(),
        fontFamily: fontFamily,
        fontStyle: 'bold',
        fontSize: 32,
        fill: textColor,
        align: 'center'
    });

    this.reset = function() { this.rect.setFill(cellColor); };
    this.clicked = function() { this.rect.setFill(cellSelectColor); };
    this.lastClicked = function() { this.rect.setFill(cellLastClickColor); };
    this.firstClicked = function() { this.rect.setFill(cellFirstClickColor); };
};