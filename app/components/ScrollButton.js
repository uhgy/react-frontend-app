/**
 * Created by hgyu on 16/3/14.
 */
import React from 'react';
import {render} from 'react-dom';

var styles = {};

/*
 回到顶部按钮
 */
styles.toTop = {
	position: 'fixed',
	display: 'block',
	padding: '.5em',
	width: '2em',
	height: '2em',
	bottom: '4em',
	right: '.5em',
	zIndex: '2',
	cursor: 'pointer',
	backgroundColor: '#f0ad4e'
}

var ScrollButton = React.createClass({
	getInitialState() {
		return {
			isTop: true,
			timer: null,
			firstScreen: true
		}
	},

	/*
	 滚轮滑动时效果
	 */
	onScrollToTop() {
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
	},

	componentDidMount() {
		window.addEventListener('scroll', this.onScrollToTop, false)
	},

	/*
	 离开页面时移除scroll监听
	 */
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollToTop, false)
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
			<div style={this.state.firstScreen? {display:'none'} : styles.toTop}
			     onClick={this.handleToTop}>
				回到顶部
			</div>
		)
	}
})

export default ScrollButton;