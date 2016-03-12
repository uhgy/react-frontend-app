/**
 * Created by hgyu on 16/3/5.
 */

import React from 'react';
import {render} from 'react-dom';

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
						<li>Article 列表</li>
						<li>Article 编辑</li>
						<li>Article 显示</li>
						<li>Article 删除</li>
						<li>Article 更新</li>
						<li>登陆登出</li>
					</ul>
					<h3>正在开发中的模块包括</h3>
					<ul>
						<li>修改密码</li>
						<li>用户关系</li>
						<li>用户文章关系</li>
					</ul>

				</article>
			</div>
		)
	}
})

export default Home;
