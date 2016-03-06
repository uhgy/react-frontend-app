import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import requestApi from '../request';

var CreateArticle = React.createClass({
	getInitialState() {
		return {
				title: "",
				title2: "",
				introduction: "",
				content: ""
		}
	},

	componentWillMount() {

	},

	handleChange(name, event) {
		var newState = {}
		newState[name] = event.target.value;
		this.setState(newState)
	},

	handleSubmit() {
		var article = {
			'title': this.state.title,
			'introduction': this.state.introduction,
			'content': this.state.content
		}
		requestApi.storeArticle(article).pipe(
				function(data) {
					//console.log(data)

				}
		)
	},

	render() {
		return (
			<section>
				<article>
					<h2>Create a New Article</h2>
					<form className="article-form">
						<fieldset>
							<section>
								<label htmlFor="title">Title</label>
								<input type="text" id="title" value={this.state.title} onChange={this.handleChange.bind(this, 'title')}/>
							</section>
							<section>
								<label htmlFor="introduction">Introduction</label>
								<input type="text" id="introduction" value={this.state.introduction} onChange={this.handleChange.bind(this, 'introduction')}/>
							</section>
							<section>
								<label htmlFor="content">Content</label>
								<textarea id="content" value={this.state.content} onChange={this.handleChange.bind(this, 'content')}/>
							</section>
							<section>
								<input type="button" value="submit" onClick={this.handleSubmit}/>
							</section>
						</fieldset>
					</form>
				</article>
			</section>
		)
	}
})


export default CreateArticle;