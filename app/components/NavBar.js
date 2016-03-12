/**
 * Created by hgyu on 16/3/5.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link, IndexLink} from 'react-router';
import auth from './../auth';

var styles = {

};

var NavBar = React.createClass({


	getInitialState() {
		return {
			loggedIn: auth.loggedIn(),
			username: "",
			userId: ""
		}

	},
	updateAuth(loggedIn) {
		var username = auth.userInfo().username
		var userId = auth.userInfo().userId
		this.setState({loggedIn: loggedIn, userId: userId, username: username})
	},

	componentWillMount() {
		auth.onChange = this.updateAuth
	},

	render() {
		//console.log(this.state)
		return (
			<header>
				<h1><Link to="/">Home</Link></h1>
				<nav className="menu">
					<Link to="/" className="menu-ctrl"></Link>
					<li><Link to="#">Article</Link>
						<ul>
							<li><Link to="/article">Article List</Link></li>
							<li><Link to="/create/article">Create Article</Link></li>
						</ul>
					</li>
					<li><Link to="#">Friend</Link></li>
				</nav>
				<section className="login">
					<Link to="/" className="login-ctrl"></Link>

						{this.state.loggedIn ? (
							<ul>
								<li><Link to={`/user/${this.state.userId}`}>{this.state.username}</Link></li>
								<li><Link to="/logout">Logout</Link></li>
							</ul>
						) : (
							<ul>
								<li><Link to="/login">Log in</Link></li>
								<li><Link to="/register" >register</Link></li>
							</ul>
						)}


			</section>
			</header>
		)
	}
})
		//<li><Link to="/"   >change password</Link></li>
export default NavBar;