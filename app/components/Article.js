import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import requestApi from '../request';
import auth from './../auth';

var Article = React.createClass({

	getInitialState() {
		return {
			logged_in: auth.loggedIn(),
			article: "",
			id: this.props.params.id
		}
	},



	componentDidMount() {
		if(!this.state.logged_in) {
			setTimeout(
					function() {
						browserHistory.push('/login')
					}, 3000)
		}
		/*
		获取文章列表
		 */
		requestApi.getArticle(this.state.id).pipe(
			function(res){
				console.log(res)
				this.setState({ article: res['data']['article'] })
			}.bind(this)
		)
	},

	render() {
		var article = this.state.article;
		if(!this.state.logged_in) {
			return (
					<div>
						<p>You are not logged in, left 3s to jump to the login page... </p>
						<Link to="/login">Login page</Link>
					</div>
			)
		}
		return (
			<article>
				<h3>{article.title}</h3>
				<p>{article.introduction} {article.published_at}</p>
				<p>{article.content}</p>
				<Link to={`/edit/article/${article.id}`}>edit Article</Link>
			</article>
		)
	}
})


export default Article;