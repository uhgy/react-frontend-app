import $ from 'jquery';

var requestApi = {

	getArticles() {
		return $.get('/api/article')
	},

	getArticle(id) {
		return $.get('/api/article/'+id)
	},

	storeArticle(article) {
		return $.ajax({
			url: '/api/article',
			method: 'POST',
			data: article
		})
	}

}

export default requestApi;