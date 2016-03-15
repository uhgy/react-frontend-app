import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import requestApi from '../../request';
import auth from './../../auth';
var styles = {}

styles.deleteButton = {
	float: "right",
	width: "4em",
	height: "2em",
	color: "#fff",
	backgroundColor: "#d9534f",
	borderColor: "#d43f3a"
}
var Article = React.createClass({

	getInitialState() {
		return {
			logged_in: auth.loggedIn(),
			article: "",
			error: []
		}
	},



	componentDidMount() {
		if(!this.state.logged_in) {
			setTimeout(
					function() {
						browserHistory.push('/login')
					}, 3000)
		}
		var error = this.state.error
		/*
		获取文章
		 */
		requestApi.getArticle(this.props.params.id).pipe(
			function(res){
				console.log(res)
				if (res && res.meta && res.meta.code == 200) {
					this.setState({article: res.data.article})
				} else {
					this.setState({error: [res.meta.code, res.meta.error]})
					console.log(error.code)
					if(error.code !== "200") {
						setTimeout(
								function() {
									browserHistory.push('/')
								}, 3000)
					}
				}
			}.bind(this)
		)
	},

	handleDeleteArticle(id) {
		if(confirm("confirm to delete")) {
			requestApi.deleteArticle(id).pipe(
					function (res) {
						var data = JSON.parse(res.data)
						if (data && data['meta'] && data['meta']['code'] == 200) {
							this.updateArticleList(this.state.page)
						} else {

						}
					}.bind(this)
			)
		}
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
		var error = this.state.error
		if(error.length !== 0 && error.code !== "200") {
			console.log(this.state.error.code)
			return (
					<div>
						<p>The page you visit is missing, left 3s to jump to the login page... </p>
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
				<input type="button" style={styles.deleteButton}value="delete" onClick={this.handleDeleteArticle.bind(this, article.id)}/>
			</article>
		)
	}
})


export default Article;