import React from 'react';
import {render} from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import Hello from './helloworld';
import auth from './auth/auth'
import Login from './auth/login';
import Register from './auth/register';
import './main.css';


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
		console.log(this.state);
		return (
				<div>
					<h1>APP!</h1>
					<ul>
						<li><Link      to="/"    >/</Link></li>
						<li><IndexLink to="/"   >/ Home</IndexLink></li>
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
		return {
			articles: []
		}

	},
	componentWillMount() {
		auth.jsonpRequest();
	},
	render() {
		return (
			<div>
				<h2>Home</h2>
				{this.state.articles}
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
			<Route path="/login" component={Login}/>
			<Route path="/register" component={Register}/>
			<Route path="/logout" component={Logout}/>
		</Route>
	</Router>
), document.getElementById('app'));
