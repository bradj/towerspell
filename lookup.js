var fs = require('fs');
var config = require('./config.js');

var Dictionary = function() {
    var that = this;

    var dict = {};

    this.find = function(obj) {
        obj.word = obj.word.toLowerCase();
        this.searchLocal(obj);
    };

    this.searchLocal = function(obj) {
        obj.callback(dict[obj.word]);
        if (dict[obj.word]) console.log('Found');
        else console.log('Not Found')
    };

    function addToDict(f) {
        if (!f) return;

        var splitted = f.split('\n');

        for (var ii = 0, len = splitted.length; ii < len; ii++) {
            if (!splitted[ii] || splitted[ii] == null || splitted[ii] == '')
                continue;
            dict[splitted[ii]] = true;
        }
    }

    // Reads the contents of /usr/share/dict/american-english
    // into a dictionary.
    function cacheDict() {
        try {
            addToDict(fs.readFileSync(
            '/usr/share/dict/american-english', 
            { encoding : 'utf8' }));
        } catch (err) {
            console.log('Error reading american-english');
        }

        try {
            addToDict(fs.readFileSync(
                config.localDict,
                { encoding : 'utf8' }));
        } catch (err) {
            console.log('Error reading local dictionary');
            console.log(err);
        }

        console.log('Dict completed');
    }
    cacheDict();
};

module.exports = Dictionary;