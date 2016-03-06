/**
 * Created by hgyu on 16/3/3.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import requestApi from '../request';

var styles = {};

//styles.inner = {
//	margin: '10px',
//	border: '1px',
//	background: '#999',
//	textAlign: 'center'
//}

styles.toTop = {
	position: 'fixed',
	display: 'block',
	width: '2em',
	height: '2em',
	bottom: '4em',
	right: '.5em',
	zIndex: '2',
	backgroundColor: '#f0ad4e'
}

var ArticleList = React.createClass({
	getInitialState() {
		return {
			articles: [],
			isTop: true,
			timer: null
		}
	},

	componentWillMount() {
		requestApi.getArticles().pipe(
			function(data){
				var data = JSON.parse(data)
				this.setState({ articles:data['data']['articles'] })
			}.bind(this)
		)
	},

	handleToTop(event) {
		var clientHeight = document.documentElement.clientHeight;
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;

		window.onscroll = function() {
			if (osTop >= clientHeight){
				obtn.style.display = 'block';
			}else {
				obtn.style.display = 'none';
			}

			if(!isTop){
				clearInterval(timer);
			}
			isTop = false;
		}


	},


	render() {
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
				<div style={styles.toTop} onClick={this.handleToTop}>回到顶部</div>
			</section>
		)
	}

})

export default ArticleList;