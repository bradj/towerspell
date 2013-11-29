var Generator = function() {

    var chances = [
        {letter: 'e', chance: .12702 },
        {letter: 't', chance: .09056 },
        {letter: 'a', chance: .08167 },
        {letter: 'o', chance: .07507 },
        {letter: 'i', chance: .06966 },
        {letter: 'n', chance: .06749 },
        {letter: 's', chance: .06327 },
        {letter: 'h', chance: .06094 },
        {letter: 'r', chance: .05987 },
        {letter: 'd', chance: .04253 },
        {letter: 'l', chance: .04025 },
        {letter: 'c', chance: .02782 },
        {letter: 'u', chance: .02758 },
        {letter: 'm', chance: .02406 },
        {letter: 'w', chance: .02360 },
        {letter: 'f', chance: .02228 },
        {letter: 'g', chance: .02015 },
        {letter: 'y', chance: .01974 },
        {letter: 'p', chance: .01929 },
        {letter: 'b', chance: .01492 },
        {letter: 'v', chance: .00978 },
        {letter: 'k', chance: .00772 },
        {letter: 'j', chance: .00153 },
        {letter: 'x', chance: .00150 },
        {letter: 'q', chance: .00095 },
        {letter: 'z', chance: .00074 }];

    this.generate = function() {
        var random = Math.random();
        var currentPercentage = 1.0;

        console.log(random);

        for (var ii = 0, len = chances.length; ii < len; ii++)
            if ((currentPercentage -= chances[ii].chance) < random) return chances[ii].letter;

    };

};