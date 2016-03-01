var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
//var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

var config = {
	entry: {
		app: path.resolve(__dirname, 'app/main.js'),
		vendors: ['react']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
			exclude: [node_modules_dir],
			loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
			query:
			{
				presets:['es2015', 'react']
			}
		}
		, {
			test: /\.css$/, // Only .css files
			loader: 'style!css' // Run both loaders
		}],
		//noParse: [pathToReact]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	]
};

module.exports = config;