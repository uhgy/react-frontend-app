/**
 * Created by hgyu on 16/3/2.
 */

import React from 'react';
import {render} from 'react-dom';

var Register = React.createClass({
	getInitialState() {
		return {}
	},

	handleSubmit(event) {
		event.preventDefault()
	},
	render() {
		return <form className="register" onSubmit={this.handleSubmit}>
						<fieldset>
							<section>
								<label htmlFor="name">Name</label>
								<input type="text" id="name" value=""/>
							</section>

							<section>
								<label htmlFor="email">Emai</label>
								<input type="email" id="email" value=""/>
							</section>

							<section>
								<label htmlFor="password">Password</label>
								<input type="password" id="password"/>
							</section>


							<section>
								<label htmlFor="password_confirmation"> Confirm Password</label>
								<input type="password" id="password_confirmation"/>
							</section>

							<section>
								<button type="submit">Register</button>
							</section>
						</fieldset>
					</form>
	}
})

export default Register;