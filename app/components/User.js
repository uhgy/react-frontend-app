/**
 * Created by hgyu on 16/3/12.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import requestApi from '../request';

var User = React.createClass({
	getInitialState() {
		return {
			user: "",
			id: this.props.params.id
		}
	},

	componentDidMount() {
		/*
		 获取文章列表
		 */
		requestApi.getUser(this.state.id).pipe(
			function(data){
				console.log(data)
				var data = JSON.parse(data)
				this.setState({ user: data.data.user })
			}.bind(this)
		)
	},

	render() {
		var user = this.state.user;
		return (
			<div>
				<h3>name:{user.name}</h3>
				<p>email:{user.email}</p>
				<p>phone_number{user.phone_number}</p>
				<Link to={`/edit/user/${user.id}`}>edit user</Link>
			</div>
		)
	}
})


export default User;