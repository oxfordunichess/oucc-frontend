import React, { ReactPropTypes, ReactElement } from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Header from './Header/index';
import Page from './pages/Page';
import News from './pages/News';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Calendar from './Calendar';
import regexes from './utils/regexes';
import axios from 'axios';
import { GithubFile, IndexData } from './interfaces';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class App extends React.Component<{}, {
	index: object,
	articles: string[],
	sessionID: string
}> {

	constructor(props: ReactPropTypes) {
		super(props);
		this.state = {
			index: {},
			articles: [],
			sessionID: Math.random().toString(16).slice(2)
		};
		axios.defaults.params = {};
		axios.defaults.params.sessionID = this.state.sessionID;
	}

	static async getArticle(pathname: string, sessionID?: string): Promise<string> {
		return await axios({
			baseURL: 'https://oxfordunichess.github.io/oucc-backend/news/',
			url: pathname,
			params: {sessionID},
			method: 'GET',
			maxRedirects: 5
		})
			.then(v => v.data)
			.catch((e) => {
				if (e) console.error(e);
				return '';
			});
	}

	static async getArticleList(sessionID?: string): Promise<GithubFile[]> {
		return await axios({
			baseURL: 'https://api.github.com/repos/oxfordunichess/oucc-backend/',
			url: 'contents/news/',
			params: {sessionID},
			method: 'get',
			maxRedirects: 5
		})
			.then(res => res.data)
			.catch((e) => {
				console.error(e);
				return [];
			});
	}

	//Index for page navigation

	static getIndex(sessionID?: string): Promise<IndexData> {
		return axios({
			url: 'index.json',
			params: {sessionID},
		})
			.then(res => res.data)
			.catch((e) => {
				console.error(e);
				return {};
			});
	}

	async fetchArticles(): Promise<string[]> {		
		let data = await App.getArticleList(this.state.sessionID).catch((e) => {
			console.error(e);
			return [];
		});
		let filenames = (data || []).map(file => file.name);
		let real = filenames.filter(name => name.endsWith('.md') && regexes.date.test(name));
		let sorted = real.sort((a, b) => {
			let a_date = new Date(a.split('_')[0]);
			let b_date = new Date(b.split('_')[0]);
			// eslint-disable-next-line no-self-compare
			if (a_date.getTime() !== a_date.getTime()) return 1;
			// eslint-disable-next-line no-self-compare
			if (b_date.getTime() !== b_date.getTime()) return -1;
			return b_date.getTime() - a_date.getTime();
		});
		let articles = new Array(sorted.length);
		this.setState({articles});
		sorted.forEach((names, i) => articles[i] = App.getArticle(names, this.state.sessionID)
			.catch(console.error)
		);
		return await Promise.all(articles);
	}

	async componentDidMount(): Promise<void> {
		App.getIndex(this.state.sessionID).then(index => this.setState({index}));
		this.fetchArticles().then(articles => this.setState({articles}));
	}

	render(): ReactElement {
		let markdownPaths = Object.entries(this.state.index).map(([k, v]) => {
			if (k.startsWith('_') || typeof v !== 'object') return null;
			return (
				<Route exact path={'/' + k} key={k + '_route'} render={(props) => {
					if (v.open) window.open(v.open);
					if (v.redirect) return <Redirect to={v.redirect} />;
					return <Page {...props} page={k} title={v.title} parent={v.parent} />;
				}} />
			);
		});
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Route render={({location}) => {
					return (
						<>
							<Header articles={this.state.articles} sessionID={this.state.sessionID} />
							<Switch location={location}>
								{markdownPaths}
								<Route exact path='/' render={() => <Page page='main' sessionID={this.state.sessionID}/>} />
								<Route exact path='/curr_news' render={() => <News title='Current News' articles={this.state.articles} sessionID={this.state.sessionID}/>}/>
								<Route exact path='/contact' render={() => <Contact title='Contact' sessionID={this.state.sessionID}/>}/>
								<Route exact path='/termcard' render={() => <Calendar title='Termcard' sessionID={this.state.sessionID}/>}/>
								<Route path='*' component={NotFound} status={404} />
							</Switch>
						</>
					);
				}}/>
			</Router>
		);
	}
}