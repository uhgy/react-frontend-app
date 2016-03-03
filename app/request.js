import $ from 'jquery';

var requestApi = {
	getArticles() {
		$.get('/articles', function(data,status){
			console.log('data:'+data+',status'+status);
		})
		return;
	}
}

export default requestApi;