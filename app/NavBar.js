/**
 * Created by hgyu on 16/3/5.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link, IndexLink} from 'react-router';

var NavBar = React.createClass({
	getInitialState() {
		return {}

	},
	componentWillMount() {

	},
	render() {
		return (
			<nav className="navbar">
				<div className="navbar-header">
					<button className="navbar-toggle collapsed">
						<ul>
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
					</button>
				</div>
			</nav>
		)
	}
})

export default NavBar;