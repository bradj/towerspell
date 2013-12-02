var Scorekeeper = function() {

    var score = 0;
    var scoreDiv = document.getElementById('score');

    var wordDiv = document.getElementById('playedword');

    this.clearPlayed = function() {
        wordDiv.textContent = '| 0';
    };

    this.played = function(word) {
        var tmpscore = this.generateScore(word);

        wordDiv.textContent = word + ' | ' + tmpscore;
    };

    this.addToScore = function(word) {
        score += this.generateScore(word);
        updateScore();
    };

    this.generateScore = function(word) {
        var tmpscore = 0;
        var len = word.length;

        for (var ii in word) {
            ii = parseInt(ii);

            var multiplier = ii == 0 ? 1 : (ii + 1);

            //console.log(Generator.chances[word[ii]].points + ' * ' + (word.length > 3 ? len : 1));

            tmpscore += Generator.chances[word[ii]].points * (word.length > 3 ? len : 1);

            // console.log('(' + Generator.chances[word[ii]].points + ' + ' +
            //     (word.length > 3 ? ii + 1 : 0) + ')' + 
            //     ' * ' + 
            //     multiplier);

            // tmpscore += 
            //     ((Generator.chances[word[ii]].points + 
            //     (word.length > 3 ? ii + 1 : 0)) *
            //     multiplier);
        }

        return tmpscore;
    };

    function updateScore() {
        scoreDiv.textContent = score;
    }

    scoreDiv.textContent = '0';
    this.clearPlayed();
};