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
					<ul>
						<li><Link to="/article">Articles</Link></li>
						<li><Link to="/create/article">Create Article</Link></li>
					</ul>
				</nav>
				<section className="login">
					<ul>
						<li>
							{this.state.loggedIn ? (
									<Link to="/logout">Log out</Link>
							) : (
									<Link to="/login">Sign in</Link>
							)}
						</li>
						<li><Link to="/register"   >register</Link></li>
					</ul>
			</section>
			</header>
		)
	}
})

export default NavBar;