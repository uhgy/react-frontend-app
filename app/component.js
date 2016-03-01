import React from 'react';
import {render} from 'react-dom';

import './Component.css';

export default class Hello extends React.Component {
	render() {
		return <h1>Hello world</h1>;
	}
}