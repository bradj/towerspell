var Scorekeeper = function() {

    var score = 0;
    var scoreDiv = document.getElementById('score');

    var wordDiv = document.getElementById('playedword');

    this.clearPlayed = function() {
        wordDiv.textContent = '| 0';
    };

    this.played = function(word) {
        var tmpscore = 0
        for (var ii in word) 
            tmpscore += Generator.chances[word[ii]].points;

        wordDiv.textContent = word + ' | ' + tmpscore;
    };

    this.addToScore = function(word) {
        for (var ii in word) 
            score += Generator.chances[word[ii]].points;

        updateScore();
    };

    function updateScore() {
        scoreDiv.textContent = score;
    }

    scoreDiv.textContent = '0';
    this.clearPlayed();
};