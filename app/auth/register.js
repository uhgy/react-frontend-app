/**
 * Created by hgyu on 16/3/2.
 */

import React from 'react';
import {render} from 'react-dom';
import './login.css';

export default class Register extends React.Component {
	render() {
		return <form method="POST" action="/auth/register">

						<div>
							<label htmlFor="name">Name</label>
							<input type="text" id="name" value=""/>
						</div>

						<div>
							<label htmlFor="email">Emai</label>
							<input type="email" id="email" value=""/>
						</div>

						<div>
							<label htmlFor="password">Password</label>
							<input type="password" id="password"/>
						</div>


						<div>
							<label htmlFor="password_confirmation"> Confirm Password</label>
							<input type="password" id="password_confirmation"/>
						</div>

						<div>
							<button type="submit">Register</button>
						</div>
				</form>

			}
}