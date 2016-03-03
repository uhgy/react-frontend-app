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

	componentWillMount() {
		requestApi.getArticle(this.state.id).pipe(
			function(data){
				console.log(data)
				var data = JSON.parse(data)
				this.setState({ article: data })
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
			</article>
		)
	}
})


export default Article;