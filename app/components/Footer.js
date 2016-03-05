/**
 * Created by hgyu on 16/3/5.
 */
import React from 'react';
import {render} from 'react-dom';

var Footer = React.createClass({
	getInitialState() {
		return {}

	},
	componentWillMount() {

	},
	render() {
		return (
			<footer>
				<div className="row">
					<p>Powered by<strong>React</strong>,<strong>Nodejs</strong></p>
				</div>
				<nav>
					<ul>
						<li><a href="#">Privacy Policy</a></li>
						<li><a href="#">Huang Gongyu</a></li>
					</ul>
				</nav>
			</footer>
		)
	}
})

export default Footer;