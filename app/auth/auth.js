import $ from 'jquery';

var auth = {

	//postLogin(data) {
	//	$.ajax({
	//		url: '/api/auth/login',
	//		type: 'POST',
	//		data: data
	//	}).done(function( data ) {
	//		console.log(data)
	//	})
	//},
	//
	//postRegister() {
	//	$.ajax({
	//		url: '/api/auth/register',
	//		type: 'POST',
	//		data: data
	//	}).done(function( data ) {
	//		console.log(data)
	//	})
	//},

	login(email, pass, cb) {
		cb = arguments[arguments.length - 1]
		if (localStorage.token) {
			if (cb) cb(true)
			this.onChange(true)
			return
		}
		pretendRequest(email, pass, (res) => {
			if (res.authenticated) {
				localStorage.token = res.token
				if (cb) cb(true)
				this.onChange(true)
			} else {
				if (cb) cb(false)
				this.onChange(false)
			}
		})
	},

	getToken() {
		return localStorage.token
	},

	logout(cb) {
		delete localStorage.token
		if (cb) cb()
		this.onChange(false)
	},

	loggedIn() {
		return !!localStorage.token
	},

	onChange() {}
}

export default auth;

function pretendRequest(email, pass, cb) {
	setTimeout(() => {

		if (email === 'joe@example.com' && pass === 'password1') {
			cb({
				authenticated: true,
				token: Math.random().toString(36).substring(7)
			})
		} else {
			cb({ authenticated: false })
		}
	}, 0)
}


