/**
 * Created by hgyu on 16/3/5.
 */
import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import auth from './auth';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import Register from './components/Register';
import Login from './components/Login';
import App from './components/App';
import Home from './components/Home';
import Logout from './components/Logout';
import './main.less';


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