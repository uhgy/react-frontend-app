/**
 * Created by hgyu on 16/3/5.
 */
import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import auth from './auth/auth';
import ArticleList from './article/ArticleList';
import Article from './article/Article';
import CreateArticle from './article/CreateArticle';
import Register from './auth/register';
import Login from './auth/login';
import App from './App';
import Home from './Home';
import Logout from './Logout';



export default (
	<Router history={browserHistory}>
		<Route path="/" component={App} >
			<IndexRoute component={Home}/>
			<Route path="article" component={ArticleList}/>
			<Route path="article/:id" component={Article}/>
			<Route path="create/article" component={CreateArticle}/>
			<Route path="/login" component={Login}/>
			<Route path="/register" component={Register}/>
			<Route path="/logout" component={Logout}/>
		</Route>
	</Router>
);