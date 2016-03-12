import $ from 'jquery';

var auth = {

	login(email, pass, cb) {
		cb = arguments[arguments.length - 1]
		if(localStorage.token) {
			if (cb) cb(true)
			this.onChange(true)
			return
		}

		postLogin(email, pass, (res) => {
			console.log(res)
			if(res.authenticated) {
				localStorage.token = res.token
				if(cb) cb(true)
				this.onChange(true)
			} else {
				if(cb) cb(false)
				this.onChange(false)
			}
		})
	},

	register(name, email, pass, pass_confirm, cb) {
		cb = arguments[arguments.length - 1]
		postRegister(name, email, pass, pass_confirm, (res) => {
			console.log(res)
			if(res.registered) {
				if(cb) cb(true)
			} else {
				if(cb) cb(false)
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

function postLogin(email, pass, cb) {
	var data = {
		email: email,
		password: pass
	}
	console.log(data)
	return $.ajax({
		url: '/api/auth/login',
		method: 'POST',
		data: data
	}).done(function (data) {
		console.log(data)
		var data = JSON.parse(data)
		console.log(data)
		if(data.meta.code === "200") {
			cb({
				authenticated: true,
				token: Math.random().toString(36).substring(7)
			})
		}
		else {
			cb({ authenticated: false })
		}
	}).fail(function (err) {
		console.log(err)
	});
}

function postRegister(name, email, pass, pass_confirm, cb) {
	var data = {
		name: name,
		email: email,
		password: pass,
		password_confirmation: pass_confirm
	}
	return $.ajax({
		url: '/api/auth/register',
		method: 'POST',
		data: data
	}).done(function (data) {
		console.log(data)
		var data = JSON.parse(data)
		if(data.meta.code === "200") {
			cb({
				registered: true,
				regInfo: data.data.regInfo
			})
		}
		else {
			cb({ registered: false })
		}
	}).fail(function (err) {
		console.log(err)
	});
}

export default auth;
