/**
 * Created by hgyu on 16/3/5.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link, IndexLink} from 'react-router';

var styles = {

};

var NavBar = React.createClass({
	getInitialState() {
		return {}

	},
	componentWillMount() {

	},
	render() {
		return (
			<header>
				<h1><Link to="/">Home</Link></h1>
				<nav className="menu">
					<Link to="/" className="menu-ctrl"></Link>
					<ul>
						<li><Link to="/article">Articles</Link></li>
						<li><Link to="/create/article">Create Article</Link></li>
					</ul>
				</nav>
				<section className="login">
					<Link to="/" className="login-ctrl"></Link>
					<ul>
						<li>
							{this.state.loggedIn ? (
									<Link to="/logout">Log out</Link>
							) : (
									<Link to="/login">Log in</Link>
							)}
						</li>
						<li><Link to="/register"   >register</Link></li>
						<li><Link to="/"   >change password</Link></li>
					</ul>
			</section>
			</header>
		)
	}
})

export default NavBar;