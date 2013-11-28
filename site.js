var express     = require('express');
var config      = require('./config.js');
var http     = require('http');

var app = express();

var cache = {};

app.configure(function(){
  var maxage = 1209600;
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public', { maxAge : maxage }));
  app.use(app.router);
});

function home(req, res) {
  res.render('index.jade');
  res.end();
}

function about(req, res) {
  res.render('about.jade');
  res.end();
}

app.get('/', home);
app.get('/about', about);

var port = config.port ? config.port : 8822;
app.listen(port);
console.log('Server running at http://127.0.0.1:' + port);