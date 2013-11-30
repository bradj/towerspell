var Globals = function() {
    cellWidth = 50;
    cellHeight = 50;
    numRows = 12;
    numCols = 8;
    boardHeight = this.cellHeight * this.numRows;
    boardWidth = this.cellWidth * this.numCols;
    cellColor = '#333';
    cellStrokeColor = '#A4ACE2';
    cellSelectColor = '#2ABA1B';
    cellLastClickColor = '#A43D42';
    cellFirstClickColor = '#F56E74';
    textColor = '#fff';
    fontFamily = 'Roboto Condensed';
    game = null;

    return this;
};

var Towerspell = function() {
    var that = this;

    var word = [];

    var stage = new Kinetic.Stage({
        container: 'board',
        width: Globals().boardWidth,
        height: Globals().boardHeight
    });

    var layer = new Kinetic.Layer();

    //
    // All cell clicks are handled here.
    //
    layer.on('click', function(evt) {
        var cell = board.getCell(evt.targetNode);
        console.log(cell.boardX + ', ' + cell.boardY + ' - ' + cell.text.getText());

        if (!that.isClickAllowed(cell)) return;

        var rect = cell.rect;
        var wordidx = cell.wordidx;
        cell.clicked();

        // user clicked the last letter in the word
        if (that.clickedLastLetter(cell))
            that.removeWord();
        else if (that.clickedFirstletter(cell)) {
            that.resetClickedState(word);
            word = [];
        }
        // user clicked an active cell that is not the last letter in the word
        else if (wordidx != null) {
            var cellsToReset = word.slice(wordidx + 1);
            that.resetClickedState(cellsToReset);
            word = word.length == 1 ? [] : word.slice(0, wordidx + 1);
            cell.lastClicked();
        }
        // user clicked inactive cell
        else {
            word.push(cell);
            cell.wordidx = word.length - 1;
            if (word.length > 2) word[word.length - 2].clicked();
            word.length == 1 ? cell.firstClicked() : cell.lastClicked();
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

    this.clickedLastLetter = function(cell) {
        if (word.length < 3 || cell.wordidx != word.length - 1) return false;
        return true;
    };

    this.clickedFirstletter = function(cell) {
        return (cell.wordidx == 0);
    };

    this.removeWord = function() {
        board.removeWord(word);
        word = [];
    };

    var board = new Board(stage, layer);
};