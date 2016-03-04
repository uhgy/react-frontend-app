var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

var config = require('./server.config');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//console.log(config.env_mode);
if(config.env_mode == 'dev'){
	app.use(express.static(path.join(__dirname, 'build')));
}else if(config.env_mode == 'deploy'){
	app.use(express.static(path.join(__dirname, 'dist')));
}

app.use('/api', function (req, res) {
	//console.log(req);
	switch(req.method) {
		case 'GET':
			request(config.backendAddress+req.path, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body)
				}
			});
			break;
		case 'POST':
				//console.log(req)
			request({
				url: config.backendAddress+req.path,
				method: 'POST',
				form: req.body
			}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					//res.send(body)
					//console.log(response)
				}
			});
			break;
		case 'PUT':
			break;
		case 'DELETE':
			break;
		default: break;
	}

});

app.post('/api', function(req, res) {
	//request(config.backendAddress+req.path
})

app.get('/', function (req, res) {
	res.render('index');
});

app.listen(app.get('port'), function () {
	console.log('Example app listening on port 3000!');
});
