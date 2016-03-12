/**
 * Created by hgyu on 16/3/2.
 */

import React from 'react';
import {render} from 'react-dom';
import auth from './../auth';

var Register = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			name: "",
			email: "",
			password: "",
			password_confirmation: "password_confirmation"
		}
	},

	/*
	 handleChange 分别绑定了title,introduction,content输入框
	 */

	handleChange(name, event) {
		var newState = {}
		newState[name] = event.target.value
		this.setState(newState)
	},

	handleSubmit(event) {
		event.preventDefault()

		var name = this.state.name;
		var email = this.state.email;
		var password = this.state.password;
		var password_confirmation = this.state.password_confirmation;


		/*
		注册后登陆, 跳转到首页
		 */
		auth.register(name, email, password, password_confirmation, (registered) => {
			console.log(registered)
			if (!registered)
				return this.setState({ error: true })
			auth.login(email, password, (loggedIn) => {
				console.log(loggedIn)
				if (!loggedIn)
					return this.setState({error: true})
				this.context.router.replace('/')
			})
		})

	},
	render() {
		return <form className="register" onSubmit={this.handleSubmit}>
						<fieldset>
							<section>
								<label htmlFor="name">Name</label>
								<input type="text" id="name" name="name"
								       onChange={this.handleChange.bind(this, 'name')}/>
							</section>

							<section>
								<label htmlFor="email">Emai</label>
								<input type="email" id="email" name="email"
								       onChange={this.handleChange.bind(this, 'email')}/>
							</section>

							<section>
								<label htmlFor="password">Password</label>
								<input type="password" id="password" name="password"
								       onChange={this.handleChange.bind(this, 'password')}/>
							</section>


							<section>
								<label htmlFor="password_confirmation"> Confirm Password</label>
								<input type="password" id="password_confirmation"
								       onChange={this.handleChange.bind(this, 'password_confirmation')}/>
							</section>

							<section>
								<button type="submit">Register</button>
							</section>
						</fieldset>
					</form>
	}
})

export default Register;