var Generator = function() {

    var chances = [
        {letter: 'E', chance: .12702 },
        {letter: 'T', chance: .09056 },
        {letter: 'A', chance: .08167 },
        {letter: 'O', chance: .07507 },
        {letter: 'I', chance: .06966 },
        {letter: 'N', chance: .06749 },
        {letter: 'S', chance: .06327 },
        {letter: 'H', chance: .06094 },
        {letter: 'R', chance: .05987 },
        {letter: 'D', chance: .04253 },
        {letter: 'L', chance: .04025 },
        {letter: 'C', chance: .02782 },
        {letter: 'U', chance: .02758 },
        {letter: 'M', chance: .02406 },
        {letter: 'W', chance: .02360 },
        {letter: 'F', chance: .02228 },
        {letter: 'G', chance: .02015 },
        {letter: 'Y', chance: .01974 },
        {letter: 'P', chance: .01929 },
        {letter: 'B', chance: .01492 },
        {letter: 'V', chance: .00978 },
        {letter: 'K', chance: .00772 },
        {letter: 'J', chance: .00153 },
        {letter: 'X', chance: .00150 },
        {letter: 'Q', chance: .00095 },
        {letter: 'Z', chance: .00074 }];

    this.generate = function() {
        var random = Math.random();
        var currentPercentage = 1.0;

        console.log(random);

        for (var ii = 0, len = chances.length; ii < len; ii++)
            if ((currentPercentage -= chances[ii].chance) < random) return chances[ii].letter;

    };

};