/**
 * Created by hgyu on 16/3/3.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import requestApi from '../request';

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
			articles: [],
			isTop: true,
			timer: null,
			firstScreen: true
		}
	},

	componentWillMount() {
		/*
		向后端发请求获取article列表
		 */
		requestApi.getArticles().pipe(
			function(data){
				var data = JSON.parse(data)
				this.setState({ articles: data['data']['articles'] })
			}.bind(this)
		)

		/*
		滚轮滑动时效果
		 */
		window.onscroll = function() {
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
			console.log(this.state)
		}.bind(this)

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
				<div style={this.state.firstScreen? {display:'none'} : styles.toTop} onClick={this.handleToTop}>回到顶部</div>
			</section>
		)
	}

})

export default ArticleList;