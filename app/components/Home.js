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
		window.addEventListener('scroll', this.onScrollToBottom, false)
	},

	/*
	 离开页面时移除scroll监听
	 */
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollToBottom, false)
	},

	/*
	 向后端发请求获取article列表
	 */
	updateArticleList(page) {
		requestApi.getRecentArticles(page).pipe(
				function(res){
					if(res.data.perPage && res.data.total
							&& res.meta.code === "200") {
						if(this.state.page * res.data.perPage < res.data.total) {
							var pageNum = Math.ceil(res.data.total / res.data.perPage)
							if (pageNum === parseInt(pageNum, 10)) {
								this.setState({pageNum: pageNum})
							}
							var articles = this.state.articles
							res.data.articles.map(function (article) {
								articles.push(article)
							})
							console.log(articles)
							this.setState({
								articles: articles,
								fetchData: 'done',
								page: page
							})
						} else {
							this.setState({fetchData: "nomore"})
						}
					}
				}.bind(this)
		)
	},


	getDocHeight() {
		var D = document;
		return Math.max(
				D.body.scrollHeight, D.documentElement.scrollHeight,
				D.body.offsetHeight, D.documentElement.offsetHeight,
				D.body.clientHeight, D.documentElement.clientHeight
		);
	},
	/*
	 判断是否到达页面底部,加载新的数据
	 */
	onScrollToBottom() {
		var clientHeight = document.documentElement.clientHeight
		var osTop = document.documentElement.scrollTop || document.body.scrollTop
		if(osTop + clientHeight >= this.getDocHeight()) {
			this.updateArticleList(this.state.page+1)
		}
	},

	render() {
		var loadMore = (function() {
			if(this.state.fetchData === "loading") {
				return <div>正在加载.........</div>;
			} else if(this.state.fetchData === "nomore") {
				return <div>没有更多文章了</div>;
			}
		}.bind(this))()
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
					{loadMore}
				</section>
				<aside>

				</aside>
				<ScrollButton/>
			</div>
		)
	}
})

export default Home;
