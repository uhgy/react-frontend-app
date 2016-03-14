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
			//console.log(res)
			if(res.authenticated) {
				localStorage.token = res.token
				createCookie("user_id", res.user_id, {expires: 15})
				createCookie("username", res.username, {expires: 15})
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
		eraseCookie("user_id")
		eraseCookie("username")
		if (cb) cb()
		this.onChange(false)
	},

	loggedIn() {
		return !!localStorage.token
	},

	userInfo() {
		return {
			"username": readCookie("username") || "",
			"user_id": readCookie("user_id") || ""
		}
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
	}).done(function (res) {
		console.log(res)
		if(res.meta.code === "200") {
			cb({
				authenticated: true,
				token: Math.random().toString(36).substring(7),
				user_id: res.data.logInfo.id,
				username: res.data.logInfo.name
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
	}).done(function (res) {
		console.log(res.data)
		if(res.meta.code === "200") {
			cb({
				registered: true,
				regInfo: res.data.regInfo
			})
		}
		else {
			cb({ registered: false })
		}
	}).fail(function (err) {
		console.log(err)
	});
}

function createCookie(name, value, days) {
	var expires;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

export default auth;
