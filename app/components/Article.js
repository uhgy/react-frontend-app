import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import requestApi from '../request';

var Article = React.createClass({
	getInitialState() {
		return {
			article: "",
			id: this.props.params.id
		}
	},

	componentDidMount() {
		/*
		获取文章列表
		 */
		requestApi.getArticle(this.state.id).pipe(
			function(data){
				console.log(data)
				var data = JSON.parse(data)
				this.setState({ article: data['data']['article'] })
			}.bind(this)
		)
	},

	render() {
		var article = this.state.article;
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