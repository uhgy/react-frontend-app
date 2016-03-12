/**
 * Created by hgyu on 16/3/2.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import auth from './../auth';


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

		/*
		登陆后跳转到首页
		 */
		auth.login(email, pass, (loggedIn) => {
			console.log(loggedIn)
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
			<form className="login" onSubmit={this.handleSubmit}>
				<fieldset>
					<section>
						<label htmlFor="email">Email</label>
						<input type="email" ref="email" id="email" name="email" defaultValue="joe@example.com"/>
					</section>
					<section>
						<label htmlFor="password">Password</label>
						<input type="password" ref="password" id="password" name="password"/>
						<p className="hint">(hint: password1)</p>
					</section>
					<section className="remember-me">
						<p>Remember Me</p>
						<input type="checkbox" id="remember" name="remember"/>
						<label htmlFor="remember">keep me logged in</label>
					</section>
					<section>
						<button type="submit">Login</button>
						<p>Not Signed up? <Link to="/register">Register now!</Link></p>
					</section>
					{this.state.error && (
							<p>Bad login information</p>
					)}
				</fieldset>
			</form>
		)
	}
})

export default Login;
