/**
 * Created by hgyu on 16/3/3.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import requestApi from '../request';

//var styles = {};
//
//styles.inner = {
//	margin: '10px',
//	border: '1px',
//	background: '#999',
//	textAlign: 'center'
//}

var ArticleList = React.createClass({
	getInitialState() {
		return {articles: []}
	},

	componentWillMount() {
		requestApi.getArticles().pipe(
			function(data){
				var data = JSON.parse(data)
				this.setState({ articles:data['data']['articles'] })
			}.bind(this)
		)
	},


	render() {
		//console.log(this.state.articles)
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
								<Link to={`article/${article.id}`}>more</Link>
						</article>
					)
				})
				}
				{this.props.children}
			</section>
		)
	}

})

export default ArticleList;