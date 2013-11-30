var http = require('http');
var config = require('./config.js');
var dynamo = require('./dynamo.js');
var xml = require("node-xml-lite");

var Dictionary = function() {
    var that = this;

    this.find = function(obj) {
        obj.word = obj.word.toLowerCase();
        this.searchDynamo(obj);
    };

    this.searchDynamo = function(obj) {
        dynamo.getWord(obj.word, function(evt) {
            if (!evt.data) that.searchDictionary(obj);
            else {
                console.log('Get Word Data');
                console.log(evt);
                obj.callback(true);
            }
        });
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

                var t = xml.parseString(body);

                if (t.childs[0].name == 'entry') {
                    obj.callback(true);
                    dynamo.addWord(obj.word);
                } 
                else obj.callback(false);
            });
        }).on("error", function(e) {
            console.log("Got error: " + e.message);
        });
    };
};

module.exports = Dictionary;