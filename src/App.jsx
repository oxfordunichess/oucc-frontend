import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Header from './Header';
import Page from './pages/Page';
import News from './pages/News';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Calendar from './pages/Calendar';

import {isDev} from './utils/auth.ts';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

const regexes = {	
	date: /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}_/
}

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			index: {},
			articles: []
		}
	}

	static async getArticle(pathname) {
		try {
			return await axios({
				baseURL: 'https://oxfordunichess.github.io/oucc-backend/news/',
				url: pathname + (isDev() ? '?token=' + Math.random().toString(36).slice(2) : ''),
				method: 'GET',
				maxRedirects: 5
			})
			.catch(async (e) => {
				return isDev() ? e : await axios({
					baseURL: 'https://oxfordunichess.github.io/oucc-backend/news/',
					url: pathname + '?token=' + Math.random().toString(36).slice(2),
					method: 'GET',
					maxRedirects: 5
				})
			})
			.then(v => v.data);
		} catch (e) {
			if (e) console.error(e);
			return '';
		}
	}

	static async getArticleList() {
		try {
			return await axios({
				url: 'https://api.github.com/repos/oxfordunichess/oucc-backend/contents/news/',
				method: 'get',
				maxRedirects: 5
			})
		} catch (e) {
			if (e) console.error(e);
			return [];
		}
	}

	//Index for page navigation

	static async getIndex() {
		try {
			let url = 'index.json' + (isDev() ? '?token=' + Math.random().toString(36).slice(2) : '');
			let req = await axios(url);
			return req.data;
		} catch (e) {
			console.error(e);
			return {};
		}
	}

	async fetchArticles() {		
		let {data} = await App.getArticleList();
		let filenames = data.map(file => file.name);
		let real = filenames.filter(name => name.endsWith('.md') && regexes.date.test(name));
		let sorted = real.sort((a, b) => {
			let a_date = new Date(a.split('_')[0]);
			let b_date = new Date(b.split('_')[0]);
			// eslint-disable-next-line no-self-compare
			if (a_date.getTime() !== a_date.getTime()) return 1;
			// eslint-disable-next-line no-self-compare
			if (b_date.getTime() !== b_date.getTime()) return -1;
			return b_date - a_date;
		});
		let articles = new Array(sorted.length);
		this.setState({articles})
		sorted.forEach((names, i) => articles[i] = App.getArticle(names)
			.catch(console.error)
		);
		return await Promise.all(articles);
	}

	async componentDidMount() {
		this.constructor.getIndex().then(index => this.setState({index}));
		this.fetchArticles().then(articles => this.setState({articles}));
	}

	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Header articles={this.state.articles} 	/>
				<Switch>
					{Object.entries(this.state.index).map(([k, v]) => {
						if (k.startsWith('_') || typeof v !== 'object') return null;
						return (
							<Route exact path={'/' + k} key={k + '_route'} render={(props) => {
								if (v.open) window.open(v.open);
								if (v.redirect) return <Redirect to={v.redirect} />;
								return <Page {...props} page={k} title={v.title} parent={v.parent} />;
							}} />
						)
					})}
					<Route exact path='/' render={() => <Page page='main' />} />
					<Route exact path='/curr_news' render={() => <News title='Current News' articles={this.state.articles}/>}/>
					<Route exact path='/contact' render={() => <Contact title='Contact' />}/>
					<Route exact path='/termcard' render={() => <Calendar title='Termcard' />}/>
					<Route path='*' component={NotFound} status={404} />
				</Switch>
			</Router>
		);
	}
}