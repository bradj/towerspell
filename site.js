var express     = require('express');
var connect     = require('connect');
var util        = require('util');
var config      = require('./config.js');
var Dictionary  = require('./lookup.js');
var http        = require('http');

var app = express();

var dictionary = new Dictionary();

var cache = {};

app.configure(function(){
  var maxage = 1209600;
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(connect.urlencoded());
  app.use(connect.json());
  app.use(express.static(__dirname + '/public', { maxAge : maxage }));
  app.use(app.router);
});

function home(req, res) {
  res.render('index.jade', { globals: { debug : config.debug } });
  res.end();
}

function about(req, res) {
  res.render('about.jade');
  res.end();
}

function getWord(req, res) {
  if (req.headers['referer'] != config.referer) {
    console.log('Bad ref');
    res.json({success : false});
    return;
  }

  util.log(util.inspect(req.body, { showHidden : false, depth : 1}));
  dictionary.find(
    { 
      word : req.body.word,
      callback : function(result) {
        res.json({ success : result });
      }
    });
}

app.get('/', home);
app.get('/about', about);
app.post('/api/word', getWord);

var port = config.port ? config.port : 8822;
app.listen(port);
console.log('Server running at http://127.0.0.1:' + port);