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
			<nav className="">
				<div className="navbar navbar-collapse">
					<ul className="nav nav-tabs">
						<li><IndexLink to="/"   >/ Home</IndexLink></li>
						<li><Link to="/article"   >/ Articles</Link></li>
						<li><Link to="/create/article"   >/ Create Article</Link></li>
					</ul>
					<ul>
						<li>
							{this.state.loggedIn ? (
									<Link to="/logout">Log out</Link>
							) : (
									<Link to="/login">Sign in</Link>
							)}
						</li>
						<li><Link to="/register"   >/ register</Link></li>
					</ul>
				</div>
			</nav>
		)
	}
})

export default NavBar;