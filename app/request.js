import $ from 'jquery';

var requestApi = {
	getArticles() {
		return $.get('/api/articles')
	},

	getArticle(id) {
		return $.get('/api/articles/'+id)
	}
}

export default requestApi;