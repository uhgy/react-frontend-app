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
匹配不以'/api/'开头的路由
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
暂时只实现了GET和POST方法
 */
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
					res.send(body)
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


//app.get('/', function (req, res) {
//	res.render('index');
//});

app.listen(app.get('port'), "0.0.0.0", function () {
	console.log('Example app listening on port 3000!');
});
