/**
 * Created by hgyu on 16/3/5.
 */

import React from 'react';
import {render} from 'react-dom';
import requestApi from '../request';
import ArticleList from './ArticleList';
import ScrollButton from './ScrollButton';

var Home = React.createClass({
	getInitialState() {
		return {
			articles: [],
			fetchData: 'loading',
			pageNum: 0,
			page: 1
		}

	},
	componentDidMount() {
		this.updateArticleList(this.state.page)
	},

	/*
	 向后端发请求获取article列表
	 */
	updateArticleList(page) {
		requestApi.getRecentArticles(page).pipe(
				function(res){
					var pageNum = Math.ceil(res.data.total / res.data.perPage)
					if(pageNum === parseInt(pageNum, 10)) {
						this.setState({pageNum: pageNum})
					}
					this.setState({
						articles: res.data.articles,
						fetchData: 'done',
						page: page
					})
				}.bind(this)
		)
	},

	render() {
			return (
			<div className="home">
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
				<section className="article-area">
					<ArticleList articles={this.state.articles}
					             fetchData={this.state.fetchData}
				               updateArticleList={this.updateArticleList}/>
				</section>
				<aside>

				</aside>
				<ScrollButton/>
			</div>
		)
	}
})

export default Home;
