/**
 * Created by hgyu on 16/3/5.
 */

import React from 'react';
import {render} from 'react-dom';
//import ArticleList f
var Home = React.createClass({
	getInitialState() {
		return {}

	},
	componentDidMount() {

	},
	render() {
		return (
			<div>
				<h2>Home</h2>
				<article>
					<h3>已经基本实现功能的模块包括</h3>
					<ul>
						<li>Article增删查改</li>
						<li>注册登陆登出</li>
					</ul>
					<h3>正在开发中的模块包括</h3>
					<ul>
						<li>修改密码</li>
						<li>user关系</li>
					</ul>
				</article>

			</div>
		)
	}
})

export default Home;
