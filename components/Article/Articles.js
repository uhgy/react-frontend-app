/**
 * Created by hgyu on 16/3/3.
 */
import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import requestApi from '../../middleware/request';
import auth from '../../middleware/auth';
import ArticleList from './ArticleList';
import ScrollButton from './../ScrollButton';
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

var Articles = React.createClass({
	getInitialState() {
		return {
			logged_in: auth.loggedIn(),
			articles: [],
			fetchData: 'loading',
			pageNum: 0,
			page: 1
		}
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
		this.updateArticleList(this.state.page)
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
						articles: res.data.articles,
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
				<ArticleList articles={this.state.articles}
				             fetchData={this.state.fetchData}
				             updateArticleList={this.updateArticleList}/>
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
				<ScrollButton/>
			</section>
		)
	}

})

export default Articles;