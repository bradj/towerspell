var Generator = function() {

    this.generate = function() {
        var random = Math.random();
        var currentPercentage = 1.0;

        for(var ii in Generator.chances)
            if ((currentPercentage -= Generator.chances[ii].chance) < random) return ii;

    };

};

Generator.chances = 
    {
        'E': { chance: .12702, points: 1 },
        'T': { chance: .09056, points: 2 },
        'A': { chance: .08167, points: 1 },
        'O': { chance: .07507, points: 1 },
        'I': { chance: .06966, points: 1 },
        'N': { chance: .06749, points: 2 },
        'S': { chance: .06327, points: 2 },
        'H': { chance: .06094, points: 4 },
        'R': { chance: .05987, points: 4 },
        'D': { chance: .04253, points: 6 },
        'L': { chance: .04025, points: 6 },
        'C': { chance: .02782, points: 8 },
        'U': { chance: .02758, points: 8 },
        'M': { chance: .02406, points: 8 },
        'W': { chance: .02360, points: 10 },
        'F': { chance: .02228, points: 10 },
        'G': { chance: .02015, points: 10 },
        'Y': { chance: .01974, points: 12 },
        'P': { chance: .01929, points: 12 },
        'B': { chance: .01492, points: 12 },
        'V': { chance: .00978, points: 16 },
        'K': { chance: .00772, points: 16 },
        'J': { chance: .00153, points: 18 },
        'X': { chance: .00150, points: 20 },
        'Q': { chance: .00095, points: 20 },
        'Z': { chance: .00074, points: 20 }
    };