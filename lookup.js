var http = require('http');
var fs = require('fs');
var config = require('./config.js');
var xml = require("node-xml-lite");

var Dictionary = function() {
    var that = this;

    var dict = {};

    this.find = function(obj) {
        obj.word = obj.word.toLowerCase();
        this.searchLocal(obj);
    };

    this.searchLocal = function(obj) {
        if (!dict[obj.word])this.searchDictionary(obj);
        else {
            console.log('Found locally');
            obj.callback(true);
        }
    };

    this.searchDictionary = function(obj) {
        var options = {
            host: 'dictionaryapi.com',
            port: 80,
            path: '/api/v1/references/collegiate/xml/' + obj.word + '?key=' + config.dictionary_key
        };

        var body = '';

        http.get(options, function(resp) {
            resp.setEncoding('utf8');
            
            resp.on('data', function(chunk) {
                body += chunk;
            });
            
            resp.on('end', function(chunk, encoding) {
                if (chunk) body += chunk;

                try {
                    var t = xml.parseString(body);

                    if (t.childs && t.childs[0].name == 'entry') {
                        obj.callback(true);
                        that.addWord(obj.word);
                        console.log('Found wm');
                    } 
                    else obj.callback(false);
                } catch (err) {
                    console.log('Exception in XML Parse');
                    console.log(err);
                    console.log(body);
                    obj.callback(false);
                }
            });
        }).on("error", function(e) {
            console.log("Got error: " + e.message);
        });
    };

    this.addWord = function(word) {
        dict[word] = true;

        fs.appendFile(config.localDict, word, function(err) {
            if (err) {
                console.log('File write error');
                console.log(err);
            }
        });
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