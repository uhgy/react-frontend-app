import $ from 'jquery';

var requestApi = {

	getArticles(page) {
		var user_id = readCookie("user_id")
		return $.get('/api/user/'+user_id+'/article?page='+page)
			done(function (res) {

			}).fail(function (err) {
				console.log(err);
			});

	},

	getArticle(id) {
		return $.get('/api/article/'+id)
			.done(function (res) {
				console.log(res);
			}).fail(function (err) {
				console.log(err);
			});
	},

	editArticle(id) {
		return $.get('/api/article/'+id+'/edit')
			.done(function (res) {
				console.log(res)
			}).fail(function (err) {
					console.log(err);
				});
	},

	storeArticle(article) {
		article.user_id = readCookie("user_id")
		return $.ajax({
			url: '/api/article',
			method: 'POST',
			data: article
		}).done(function (res) {

		}).fail(function (err) {
			console.log(err);
		});
	},

	updateArticle(id, article) {
		return $.ajax({
			url: '/api/article/'+id,
			method: 'PUT',
			data: article
		}).done(function (res) {

		}).fail(function (err) {
			console.log(err);
		});
	},

	deleteArticle(id) {
		return $.ajax({
			url: '/api/article/'+id,
			method: 'DELETE'
		}).done(function (res) {

		}).fail(function (err) {
			console.log(err);
		});
	},

	getUsers() {
		return $.get('/api/user')
		done(function (res) {

		}).fail(function (err) {
			console.log(err);
		});

	},

	getUser(id) {
		return $.get('/api/user/'+id)
				.done(function (res) {
					console.log(res);
				}).fail(function (err) {
					console.log(err);
				});
	},

	editUser(id) {
		return $.get('/api/user/'+id+'/edit')
				.done(function (res) {
					console.log(res)
				}).fail(function (err) {
					console.log(err);
				});
	},

	storeUser(user) {
		return $.ajax({
			url: '/api/user',
			method: 'POST',
			data: user
		}).done(function (res) {

		}).fail(function (err) {
			console.log(err);
		});
	},

	deleteUser(id) {
		return $.ajax({
			url: '/api/user/'+id,
			method: 'DELETE'
		}).done(function (res) {

		}).fail(function (err) {
			console.log(err);
		});
	}
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

export default requestApi;