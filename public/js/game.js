var Globals = function() {
    cellWidth = 50;
    cellHeight = 40;
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

    this.endless = false;

    //
    // All cell clicks are handled here.
    //
    layer.on('click touchend', function(evt) {
        var cell = board.getCell(evt.targetNode);
        console.log(cell.boardX + ', ' + cell.boardY + ' - ' + cell.text.getText());

        if (!that.isClickAllowed(cell)) return;

        var rect = cell.rect;
        var wordidx = cell.wordidx;
        cell.clicked();

        // user clicked the last letter in the word
        if (that.clickedLastLetter(cell)) that.isWord();
        // user clicked the first letter in the word
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

        score.played(that.getLetters());

        layer.draw();

        evt.cancelBubble = true;
    });

    this.clickedLastLetter = function(cell) {
        if (word.length < 3 || cell.wordidx != word.length - 1) return false;
        return true;
    };

    this.clickedFirstletter = function(cell) {
        return (cell.wordidx == 0);
    };

    this.isClickAllowed = function(cell) {
        if (word.length == 0 || cell.wordidx != null) return true;

        var lastcell = word[word.length - 1];

        return (Math.abs(lastcell.boardX - cell.boardX) <= 1 && Math.abs(lastcell.boardY - cell.boardY) <= 1);
    };

    this.getLetters = function() {
        var letters = '';
        
        for (var ii = 0, len = word.length; ii < len; ii++)
            letters += word[ii].text.getText();

        return letters;
    };

    this.resetClickedState = function(arr) {
        for (var ii = 0, len = arr.length; ii < len; ii++) {
            var cell = arr[ii];
            cell.wordidx = null;
            cell.reset();
        }
    };

    this.removeWord = function() {
        board.removeWord(word);
        word = [];
    };

    this.isWord = function() {
        var letters = this.getLetters();

        console.log('Checking for ' + letters);

        $.ajax({
            url: '/api/word',
            data: { word : letters },
            dataType: 'json',
            type: 'POST',
            success: function(evt) {
                if (evt.success) {
                    score.addToScore(letters);
                    that.removeWord();
                    
                    if (that.endless) 
                        board.addRow();
                }
                else {
                    that.resetClickedState(word);
                    word = [];
                }

                score.clearPlayed();
                layer.draw();
            },
            error: function(evt) {
                console.log('Error');
                console.log(evt);
            }
        });
    };

    this.start = function(endless) {
        that.endless = endless;
        board.generateBoard(that.endless);
        $('.game-parent').show();
    };

    var board = new Board(stage, layer);
    var score = new Scorekeeper();
};