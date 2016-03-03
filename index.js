
//var express = require('express');
//var path = require('path');
//var bodyParser = require('body-parser');
//var app = express();

var config = require('./server.config');

//app.set('port', process.env.PORT || 3000);
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'dist')));
//app.set('views', './views');


//app.get('/', function (req, res) {
//	res.render('index');
//});
//
//app.get('/api/articles', function (req, res) {
//
//});


//app.listen(app.get('port'), function () {
//	console.log('Example app listening on port 3000!');
//});


var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var config = require('./server.config');

var server = http.createServer(function(req, res) {
	console.log(req+res);
	// You can define here your custom logic to handle the request
	// and then proxy the request.
	proxy.web(req, res, { target: config.BACKEND_ADDRESS });
});

server.listen(3000);