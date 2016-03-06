/**
 * Created by hgyu on 16/3/5.
 */

import React from 'react';
import {render} from 'react-dom';

var Home = React.createClass({
	getInitialState() {
		return {}

	},
	componentWillMount() {

	},
	render() {
		return (
			<div>
				<h2>Home</h2>
				<article>
					<p>已经基本实现功能的模块(只要能打开的都算..)包括</p>
					<ul>
						<li>Article 列表</li>
						<li>Article 编辑</li>
						<li>Article 显示</li>
						<li>登陆登出(没有向后台请求数据)</li>
						<li></li>
					</ul>
					<p>正在开发中的模块包括</p>
					<ul>
						<li>Article 更新</li>
						<li>Article 删除</li>
						<li>修改密码</li>
					</ul>

				</article>
			</div>
		)
	}
})

export default Home;
