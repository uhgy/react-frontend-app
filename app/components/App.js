/**
 * Created by hgyu on 16/3/5.
 */

import React from 'react';
import {render} from 'react-dom';
import auth from './../auth';
import Login from './Login';
import NavBar from './NavBar';
import Footer from './Footer';


/*
网站入口
 */
var App = React.createClass({

	getInitialState() {
		return {
			logged_in: auth.loggedIn(),
			username: auth.userInfo().username,
			user_id: auth.userInfo().user_id

		}
	},

	updateAuth(logged_in) {
		var username = auth.userInfo().username
		var user_id = auth.userInfo().user_id
		this.setState({logged_in: logged_in, user_id: user_id, username: username})

	},

	componentWillMount() {
		auth.onChange = this.updateAuth
		auth.login()
	},

	render() {
		return (
			<div>
				<NavBar {...this.state}/>
				<div className="main-body">
					{this.props.children || <p>You are {!this.state.logged_in && 'not'} logged in.</p>}
				</div>
				<Footer/>
			</div>
		)
	}
})

export default App;