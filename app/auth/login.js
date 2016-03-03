/**
 * Created by hgyu on 16/3/2.
 */
import React from 'react';
import {render} from 'react-dom';
import auth from './auth';
import './login.less';


var Login = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			error: false
		}
	},

	handleSubmit(event) {
		event.preventDefault()

		const email = this.refs.email.value
		const pass = this.refs.password.value

		auth.login(email, pass, (loggedIn) => {
			if (!loggedIn)
				return this.setState({ error: true })

			const { location } = this.props

			if (location.state && location.state.nextPathname) {
				this.context.router.replace(location.state.nextPathname)
			} else {
				this.context.router.replace('/')
			}
		})
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>

				<label htmlFor="email">Emai</label>
				<input type="email" ref="email" id="email" defaultValue="joe@example.com"/>

				<label htmlFor="password">Password</label>
				<input type="password" ref="password" id="password"/>(hint: password1)

				<input type="checkbox" id="remember"/>
				<label htmlFor="remember"> Remember Me</label>

				<button type="submit">Login</button>

				{this.state.error && (
						<p>Bad login information</p>
				)}
			</form>
		)
	}
})

export default Login;
