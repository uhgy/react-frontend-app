import React from 'react';
import {render} from 'react-dom';
import routes from './routes';

//render((
//	<Router history={browserHistory}>
//		<Route path="/" component={App} >
//			<IndexRoute component={Home}/>
//			<Route path="article" component={ArticleList}/>
//			<Route path="article/:id" component={Article}/>
//			<Route path="create/article" component={CreateArticle}/>
//			<Route path="/login" component={Login}/>
//			<Route path="/register" component={Register}/>
//			<Route path="/logout" component={Logout}/>
//		</Route>
//	</Router>
//), document.getElementById('app'));

//Router.run(routes, browserHistory, function(Handler) {
//	React.render(<Handler />, document.getElementById('app'));
//});

render(routes,document.getElementById('app'))