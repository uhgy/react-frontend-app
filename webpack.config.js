//var webpack = require('webpack');
//var path = require('path');
//var node_modules_dir = path.resolve(__dirname, 'node_modules');
////var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
//
//var deps = [
//	'react/dist/react.min.js',
//	'react-dom/dist/react-dom.min.js',
//	//'react-dom/dist/react-dom-server.min.js'
//];
//
//var config = {
//	entry: ['webpack/hot/dev-server', './app/main.js'],
//	resolve: {
//		alias: {}
//	},
//	output: {
//		path: path.resolve(__dirname, 'build'),
//		filename: 'bundle.js'
//	},
//	module: {
//		loaders: [{
//			test: path.resolve(node_modules_dir, deps[0]),
//			loader: 'expose?React'// 使用暴露全局加载器来暴露压缩版的 React JS，比如 react-router 需要这个。
//		},{
//			//test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
//			test: path.resolve(node_modules_dir, deps[0]),
//			loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
//			query:
//			{
//				presets:['es2015', 'react']
//			}
//		},{
//			test: /\.css$/, // Only .css files
//			loader: 'style!css' // Run both loaders
//		}],
//		noParse: []
//	}
//};
//
//deps.forEach(function (dep) {
//	var depPath = path.resolve(node_modules_dir, dep);
//	config.resolve.alias[dep.split(path.sep)[0]] = depPath;
//	config.module.noParse.push(depPath);
//});
//
//module.exports = config;




var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var deps = [
	'react/dist/react.min.js',
	'react-dom/dist/react-dom.min.js',
	//'react-dom/dist/react-dom-server.min.js'
];

var config = {
	entry: ['webpack/hot/dev-server', './app/main.js'],
	resolve: {
		alias: {}
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
			loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
			query:
			{
				presets:['es2015', 'react']
			}
		}, {
			test: /\.css$/, // Only .css files
			loader: 'style!css' // Run both loaders
		}],
		noParse: []
	}
};

deps.forEach(function (dep) {
	var depPath = path.resolve(node_modules_dir, dep);
	config.resolve.alias[dep.split(path.sep)[0]] = depPath;
	config.module.noParse.push(depPath);
});

module.exports = config;


