import $ from 'jquery';

var requestApi = {
	getArticles() {
		return $.get('/api/articles')
	}
}

export default requestApi;