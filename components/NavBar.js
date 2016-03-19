/**
 * Created by hgyu on 16/3/5.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link, IndexLink} from 'react-router';
import auth from '../middleware/auth';

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

						{this.props.logged_in ? (
							<ul>
								<li><Link to={`/user/${this.props.user_id}`}>{this.props.username}</Link></li>
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