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

    this.setPosition = function(x, y) {
        this.setYPosition(y);
        this.setXPosition(x);
    };

    this.setYPosition = function(y) {
        this.rect.setY(y);
        this.text.setY(y);
    };

    this.setXPosition = function(x) {
        this.rect.setX(x);
        this.text.setX(x);
    };

    this.setArrayPosition = function(x, y) {
        // I do this because I am listening for events off of the text and rect.
        // I am sure there is a better way... Don't know what that way is yet.
        this.boardX = x;
        this.boardY = y;
        this.rect.boardX = this.boardX;
        this.rect.boardY = this.boardY;
        this.text.boardX = this.boardX;
        this.text.boardY = this.boardY;
    };
};