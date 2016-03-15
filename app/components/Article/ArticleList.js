/**
 * Created by hgyu on 16/3/3.
 */
import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import ScrollButton from './../ScrollButton';

var ArticleList = React.createClass({
	getInitialState() {
		return {}
	},

	render() {
		if(this.props.articles.length === 0) {
			if(this.props.fetchData === 'done') {
				return <p>There is no articles!</p>
			} else if(this.props.fetchData === 'loading') {
				return <p>loading......</p>
			}
		}
		return (
				<div className="article-list">
					{this.props.articles.map(function (article) {
						return (
								<article key={article.id}>
									<section>
										<div>Author:<strong>{article.username}</strong></div>
										<div>Title:<strong>{article.title}</strong></div>
										<div>introduction:{article.introduction}</div>
										<div>published_at:<em>{article.published_at}</em></div>
									</section>
									<section className="article-content">
										<div>{article.content}</div>
									</section>
									<Link to={`article/${article.id}`}>details</Link>
								</article>
						)
					}.bind(this))}
				</div>
		)
	}

})

export default ArticleList;