/**
 * Created by hgyu on 16/3/3.
 */
import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import requestApi from '../request';
import auth from './../auth';

var styles = {};

/*
  回到顶部按钮
 */
styles.toTop = {
	position: 'fixed',
	display: 'block',
	width: '2em',
	height: '2em',
	bottom: '4em',
	right: '.5em',
	zIndex: '2',
	cursor: 'pointer',
	backgroundColor: '#f0ad4e'
}

var ArticleList = React.createClass({
	getInitialState() {
		return {
			logged_in: auth.loggedIn(),
			articles: [],
			isTop: true,
			timer: null,
			firstScreen: true,
			fetchData: 'loading',
			pageNum: 0,
			page: 1
		}
	},

	/*
	 滚轮滑动时效果
	 */
	onScrollToTop() {
			var clientHeight = document.documentElement.clientHeight
			var osTop = document.documentElement.scrollTop || document.body.scrollTop
			if (osTop >= clientHeight){
				this.setState({firstScreen: false})
			}else {
				this.setState({firstScreen: true})

			}

			if(!this.state.isTop){
				clearInterval(this.state.timer)
			}
			this.setState({isTop: false})
	},

	componentWillMount() {

	},

	componentDidMount() {
		if(!this.state.logged_in) {
			setTimeout(
					function() {
						browserHistory.push('/login')
					}, 3000)
		}
		var page = this.state.page
		this.updateArticleList(page)
		window.addEventListener('scroll', this.onScrollToTop, false)
	},

	/*
	离开页面时移除scroll监听
	 */
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollToTop, false)
	},

	handleDeleteArticle(id) {
		requestApi.deleteArticle(id).pipe(
			function(res) {
				var data = JSON.parse(res.data)
				if (data && data['meta'] && data['meta']['code'] == 200) {
					this.updateArticleList(this.state.page)
				} else {

				}
			}.bind(this)
		)
	},

	/*
	 向后端发请求获取article列表
	 */
	updateArticleList(page) {
		requestApi.getArticles(page).pipe(
				function(res){
					var pageNum = Math.ceil(res.data.total / res.data.perPage)
					if(pageNum === parseInt(pageNum, 10)) {
						this.setState({pageNum: pageNum})
					}
					this.setState({
						articles: res['data']['articles'],
						fetchData: 'done',
						page: page
					})
				}.bind(this)
		)
	},

	/*
	分页
	 */
	handlePageClick(event) {
		var page = parseInt(event.selected) + 1;
		this.updateArticleList(page)
	},

	/*
	点击回到顶部按钮
	 */
	handleToTop(event) {
		var timerVal = setInterval(function() {
			this.setState({isTop: true})
			var osTop = document.documentElement.scrollTop || document.body.scrollTop
			var ispeed = Math.floor(-osTop / 10)
			document.documentElement.scrollTop = document.body.scrollTop += ispeed
			if (osTop == 0) {
				clearInterval(this.state.timer);
			}
		}.bind(this))
		this.setState({timer: timerVal})
	},

	render() {
		//console.log('render')
		if(!this.state.logged_in) {
			return (
					<div>
						<p>You are not logged in, left 3s to jump to the login page... </p>
						<Link to="/login">Login page</Link>
					</div>
			)
		}
		if(this.state.articles.length === 0) {
			if(this.state.fetchData === 'done') {
				return <p>There is no articles!</p>
			} else if(this.state.fetchData === 'loading') {
				return <p>loading......</p>
			}
		}
		return (
			<section className="article-list">
				{this.state.articles.map(function (article) {
					return (
						<article key={article.id}>
							<section>
								<div>Title:<strong>{article.title}</strong></div>
								<div>introduction:{article.introduction}</div>
								<div>published_at:<em>{article.published_at}</em></div>
							</section>
							<section>{article.content}</section>
							<Link to={`article/${article.id}`}>details</Link>
							<input type="button" value="delete" onClick={this.handleDeleteArticle.bind(this, article.id)}/>
						</article>
					)
				}.bind(this))}
				<ReactPaginate previousLabel={"previous"}
				               nextLabel={"next"}
				               breakLabel={<li className="break"><a href="">...</a></li>}
				               pageNum={this.state.pageNum}
				               marginPagesDisplayed={2}
				               pageRangeDisplayed={5}
				               clickCallback={this.handlePageClick}
				               containerClassName={"pagination"}
				               subContainerClassName={"pages pagination"}
				               activeClassName={"active"} />
				<div style={this.state.firstScreen? {display:'none'} : styles.toTop} onClick={this.handleToTop}>回到顶部</div>
			</section>
		)
	}

})

export default ArticleList;