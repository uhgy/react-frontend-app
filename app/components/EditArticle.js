/**
 * Created by hgyu on 16/3/11.
 */
import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import requestApi from '../request';
import auth from './../auth';

var CreateArticle = React.createClass({
	getInitialState() {
		return {
			logged_in: auth.loggedIn(),
			title: "",
			introduction: "",
			content: "",
			created: false,
			error: []
		}
	},

	getArticle() {
		requestApi.editArticle(this.props.params.id).pipe(
				function(res){
					console.log(res)
					if(res && res['meta'] && res['meta']['code'] == 200) {
						this.setState({
							title: res['data']['article']['title'],
							introduction: res['data']['article']['introduction'],
							content: res['data']['article']['content']
						})
					} else{
						this.setState({
							error: [res.meta.code, res.meta.error]
						})
						if(this.state.error.length !== 0) {
							setTimeout(
									function() {
										browserHistory.push('/')
									}, 3000)
						}
					}
				}.bind(this)
		)
	},

	componentDidMount() {
		if(!this.state.logged_in) {
			setTimeout(
					function() {
						browserHistory.push('/login')
					}, 3000)
		}
		this.getArticle()
		console.log(this.state.error)
	},
	/*
	 handleChange 分别绑定了title,introduction,content输入框
	 */

	handleChange(name, event) {
		var newState = {}
		newState[name] = event.target.value
		this.setState(newState)
	},

	handleSubmit(event) {
		event.preventDefault()
		var article = {
			'title': this.state.title,
			'introduction': this.state.introduction,
			'content': this.state.content
		}
		var id = this.props.params.id
		requestApi.updateArticle(id, article).pipe(
			function(res) {
				if(res && res['meta'] && res['meta']['code'] == 200) {
					this.setState({created: true})
					browserHistory.push('/article')
				}else {
					this.setState({created: false})
				}

			}.bind(this)
		)
	},

	render() {
		console.log(this.state)
		if(!this.state.logged_in) {
			return (
					<div>
						<p>You are not logged in, left 3s to jump to the login page... </p>
						<Link to="/login">Login page</Link>
					</div>
			)
		}
		if(this.state.error.length !== 0) {
			return (
					<div>
						<p>You have no privilege to edit this article, left 3s to jump to the first page... </p>
						<Link to="/login">Login page</Link>
					</div>
			)
		}
		return (
			<section>
				{this.state.created ? (<p>Success</p>) : (
					<article>
						<h2>Create a New Article</h2>
						<form className="article-form">
							<fieldset>
								<section>
									<label htmlFor="title">Title</label>
									<input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange.bind(this, 'title')}/>
								</section>
								<section>
									<label htmlFor="introduction">Introduction</label>
									<input type="text" id="introduction" name="introduction" value={this.state.introduction} onChange={this.handleChange.bind(this, 'introduction')}/>
								</section>
								<section>
									<label htmlFor="content">Content</label>
									<textarea id="content" name="content" value={this.state.content} onChange={this.handleChange.bind(this, 'content')}/>
								</section>
								<section>
									<button value="submit" onClick={this.handleSubmit}>提交</button>
								</section>
							</fieldset>
						</form>
					</article>
				)}
			</section>
		)
	}
})


export default CreateArticle;