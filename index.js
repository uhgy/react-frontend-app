var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var rewrite = require('express-urlrewrite');
var app = express();

var config = require('./server.config');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log(config);

/*
匹配不以'/api/'以及'/public/'开头的路由
*/
app.use(rewrite(/^(?!((\/api)|(\/public)))\/*/, '/index.html'))

/*
开发模式和线上模式
 */
if(config.env_mode == 'dev'){
	app.use(express.static(path.join(__dirname, 'build')));
}else if(config.env_mode == 'deploy' || config.env_mode == 'production'){
	app.use(express.static(path.join(__dirname, 'dist')));
	app.use('/public', express.static(path.join(__dirname, 'public')));
}



/*
利用request向后端转发请求
暂时只实现了GET/POST/DELETE方法
 */
app.use('/api', function (req, res) {
	switch(req.method) {
		case 'GET':
			request({
				url: config.backendAddress+req.path,
				headers: {
					'Cookie': req.headers.cookie
				},
				method: req.method,
			}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body)
				}
			});
			break;
		case 'POST':
			request({
				url: config.backendAddress+req.path,
				headers: {
					'Cookie': req.headers.cookie
				},
				method: req.method,
				form: req.body
			}, function (error, response, body) {
				//console.log(response);
				if (!error && response.statusCode == 200) {
					//var setCookie = response.headers['set-cookie'];
					//res.setHeader('set-cookie', setCookie)
					//res.setHeader('Cache-Control', 'no-cache'); // 4 days
					//res.setHeader('Expires', new Date(Date.now() + 3600).toUTCString());
					res.send(body)
				}
			});
			break;
		case 'PUT':
			break;
		case 'DELETE':
			request({
				url: config.backendAddress+req.path,
				method: req.method,
				headers: {
					'Cookie': req.headers.cookie
				},
			}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body)
					//console.log(response)
				}
			});
			break;
		default: break;
	}

});


//app.get('/', function (req, res) {
//	res.render('index');
//});

app.listen(app.get('port'), "0.0.0.0", function () {
	console.log('Example app listening on port 3000!');
});
