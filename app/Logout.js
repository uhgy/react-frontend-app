/**
 * Created by hgyu on 16/3/5.
 */

import React from 'react';
import {render} from 'react-dom';

var Logout = React.createClass({
	componentDidMount() {
		auth.logout()
	},
	render() {
		return (
			<div>
				<h2>Logout</h2>
			</div>
		)
	}
})

export default Logout;