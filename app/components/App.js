/**
 * Created by hgyu on 16/3/5.
 */

import React from 'react';
import {render} from 'react-dom';
import auth from './../auth';
import Login from './Login';
import NavBar from './NavBar';
import Footer from './Footer';

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
				<NavBar/>

				{this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
				<Footer/>
			</div>
		)
	}
})

export default App;