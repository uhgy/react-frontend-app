import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import Hello from './helloworld';
import auth from './auth/auth';
import Login from './auth/login';
import ArticleList from './article/ArticleList';
import Article from './article/Article';
import CreateArticle from './article/CreateArticle';
import Register from './auth/register';
import './main.less';

var App = React.createClass({
	getInitialState() {
		return {
			loggedIn: auth.loggedIn()
		}
	},

	updateAuth(loggedIn) {
		this.setState({
			loggedIn: loggedIn
		})
	},

	componentWillMount() {
		auth.onChange = this.updateAuth
		auth.login()
	},

	render() {
		return (
				<div>
					<h1>Single Page App</h1>
					<ul>
						<li><Link      to="/"    >/</Link></li>
						<li><IndexLink to="/"   >/ Home</IndexLink></li>
						<li><Link to="/article"   >/ Articles</Link></li>
						<li><Link to="/create/article"   >/ Create Article</Link></li>
						<li>
							{this.state.loggedIn ? (
									<Link to="/logout">Log out</Link>
							) : (
									<Link to="/login">Sign in</Link>
							)}
						</li>
						<li><Link to="/register"   >/ register</Link></li>

					</ul>

					{this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
				</div>
		)
	}
})

var Home = React.createClass({
	getInitialState() {
		return {}

	},
	componentWillMount() {

	},
	render() {
		return (
			<div>
				<h2>Home</h2>
			</div>
		)
	}
})

var Logout = React.createClass({
	componentDidMount() {
		auth.logout()
	},
	render() {
		return (
				<div>
					<h2>Logout</h2>
				</div>
		)
	}
})


render((
	<Router history={browserHistory}>
		<Route path="/" component={App} >
			<IndexRoute component={Home}/>
			<Route path="article" component={ArticleList}/>
			<Route path="article/:id" component={Article}/>
			<Route path="create/article" component={CreateArticle}/>
			<Route path="/login" component={Login}/>
			<Route path="/register" component={Register}/>
			<Route path="/logout" component={Logout}/>
		</Route>
	</Router>
), document.getElementById('app'));
