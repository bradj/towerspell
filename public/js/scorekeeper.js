var Scorekeeper = function() {

    var score = 0;
    var scoreDiv = document.getElementById('score');

    var wordDiv = document.getElementById('playedword');

    this.clearPlayed = function() {
        wordDiv.innerText = '| 0';
    };

    this.played = function(word) {
        var tmpscore = 0
        for (var ii in word) 
            tmpscore += Generator.chances[word[ii]].points;

        wordDiv.innerText = word + ' | ' + tmpscore;
    };

    this.addToScore = function(word) {
        for (var ii in word) 
            score += Generator.chances[word[ii]].points;

        updateScore();
    };

    function updateScore() {
        scoreDiv.innerText = score;
    }

    scoreDiv.innerText = '0';
    this.clearPlayed();
};