/**
 * Created by hgyu on 16/3/3.
 */
import React from 'react';
import {render} from 'react-dom';
import requestApi from '../request';
import './article.less';

var styles = {};

styles.inner = {
	border: '1px',
	background: '#999',
	textAlign: 'center'
}

var Article = React.createClass({
	getInitialState() {
		return {articles: []};
	},

	componentWillMount() {
		requestApi.getArticles().pipe(
			function(data){
				var data = JSON.parse(data);
				this.setState({ articles:data['articles'] })
			}.bind(this)
		);
	},

	render() {
		console.log(this.state.articles)
		return (
			<section id="article_area">
				{this.state.articles.map(function (article) {
					return (
						<article key={article.id}>
							<div style={styles.inner}>
								<h3>{article.title}</h3>
								<p>
									{article.introduction}
									{article.published_at}
								</p>
								<p>{article.content}</p>
							</div>
						</article>
					)
				})
				}
			</section>
		)
	}

})

export default Article;