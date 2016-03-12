import $ from 'jquery';

var requestApi = {

	getArticles() {
		return $.get('/api/article')
			done(function (data) {

			}).fail(function (err) {
				console.log(err);
			});

	},

	getArticle(id) {
		return $.get('/api/article/'+id)
			.done(function (data) {
				console.log(data);
			}).fail(function (err) {
				console.log(err);
			});
	},

	editArticle(id) {
		return $.get('/api/article/'+id+'/edit')
			.done(function (data) {
				console.log(data)
			}).fail(function (err) {
					console.log(err);
				});
	},

	storeArticle(article) {
		return $.ajax({
			url: '/api/article',
			method: 'POST',
			data: article
		}).done(function (data) {

		}).fail(function (err) {
			console.log(err);
		});
	},

	deleteArticle(id) {
		return $.ajax({
			url: '/api/article/'+id,
			method: 'DELETE'
		}).done(function (data) {

		}).fail(function (err) {
			console.log(err);
		});
	},

	getUsers() {
		return $.get('/api/user')
		done(function (data) {

		}).fail(function (err) {
			console.log(err);
		});

	},

	getUser(id) {
		return $.get('/api/user/'+id)
				.done(function (data) {
					console.log(data);
				}).fail(function (err) {
					console.log(err);
				});
	},

	editUser(id) {
		return $.get('/api/user/'+id+'/edit')
				.done(function (data) {
					console.log(data)
				}).fail(function (err) {
					console.log(err);
				});
	},

	storeUser(user) {
		return $.ajax({
			url: '/api/user',
			method: 'POST',
			data: user
		}).done(function (data) {

		}).fail(function (err) {
			console.log(err);
		});
	},

	deleteUser(id) {
		return $.ajax({
			url: '/api/user/'+id,
			method: 'DELETE'
		}).done(function (data) {

		}).fail(function (err) {
			console.log(err);
		});
	}
}

export default requestApi;