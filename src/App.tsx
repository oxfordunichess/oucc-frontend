import React, { ReactElement, ReactNode } from 'react';
import './App.scss';
import { Root, Routes } from 'react-static';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './index.d.ts';

import MobileHeader from './Header/mobile';
import Header from './Header/index';
import Page from './pages/Page';
import News from './pages/News';
import NotFound from './pages/NotFound';

import Callback from './Auth/Callback';
import Auth from './Auth/Auth';

import * as regexes from './utils/regexes';
import axios from './utils/axios';
import { GithubFile, IndexData } from './interfaces';

import cachedPages from './assets/index.json';
import { SessionContext } from './utils/contexts';
import { isMobile } from './utils/auth';
import Package from '../package.json';

export default class App extends React.Component<{}, {
	index: IndexData,
	articles: string[],
	sessionID: string
}> {
	
	public state = {
		index: cachedPages as IndexData,
		articles: [] as string[],
		sessionID: Math.random().toString(16).slice(2)
	}

	static getArticle(pathname: string, sessionID?: string): Promise<string> {
		return axios({
			url: 'news/' + pathname,
			params: { sessionID },
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
			params: { sessionID },
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
			params: { sessionID },
		})
			.then(res => res.data)
			.catch((e) => {
				console.error(e);
			});
	}

	static async fetchArticles(sessionID: string): Promise<string[]> {		
		let data = await App.getArticleList(sessionID).catch((e) => {
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
		sorted.forEach((names, i) => articles[i] = App.getArticle(names, sessionID)
			.catch(console.error)
		);
		return await Promise.all(articles);
	}

	componentDidMount(): void {
		axios.defaults.params = {};
		axios.defaults.params.sessionID = this.state.sessionID;
		Promise.all([
			App.getIndex(this.state.sessionID).then(index => index ? this.setState({index}) : null),
			App.fetchArticles(this.state.sessionID).then(articles => this.setState({articles}))
		]);
	}

	render(): ReactElement {
		let markdownPaths = Object.entries(this.state.index).map(([k, v]) => {
			if (k.startsWith('_') || typeof v !== 'object') return null;
			return (
				<Route exact path={`/${v.private ? 'private/' : ''}${k}`} key={k + '_route'} render={(props) => {
					if (v.open) window.open(v.open);
					if (v.redirect) return <Redirect to={v.redirect} />;
					let page = k;
					if (v.file) page = v.file;
					return (
						<SessionContext.Provider value={this.state.sessionID}>
							<Page
								{...props}
								page={page}
								title={v.title}
							/>
						</SessionContext.Provider>
					);
				}} />
			);
		});
		let routeMap = new Map() as Map<string, ReactNode>;
		Object.entries(this.state.index).forEach(([k, v]) => {
			if (k.startsWith('_') || typeof v !== 'object') return null;
			routeMap.set(k, (
				<Route exact path={`/${v.private ? 'private/' : ''}${k}`} key={k + '_route'} render={(props) => {
					if (v.open) window.open(v.open);
					if (v.redirect) return <Redirect to={v.redirect} />;
					let page = k;
					if (v.file) page = v.file;
					return (
						<SessionContext.Provider value={this.state.sessionID}>
							<Page
								{...props}
								page={page}
								title={v.title}
							/>
						</SessionContext.Provider>
					);
				}} />
			));
		});
		return (
			<SessionContext.Provider value={this.state.sessionID}>
				<Router basename={process.env.PUBLIC_URL}> {/*
					<Root>
						<Switch>
							<Route path='/articleData.json' render={() => JSON.stringify(this.state.articles, null, 4)} />
							<Route path='version' render={() => Package.version} />
							<Routes render={({routePath}) => {
								return routeMap.get(routePath) || null;
							}} />}
							<Route exact path='/' render={(props) => <Page {...props} page='main' />} />
							<Route exact path='/curr_news' render={(props) => <News {...props} title='Current News' articles={this.state.articles} />}/>
							<Route path='*' component={NotFound} status={404} />
						</Switch>
					</Root>*/}
					<Route render={({location}) => {
						
						return (
							<>
								{(() => {
									switch (location.pathname) {
										case ('/articleData.json'):
											return null;
										case ('/version'):
											return null;
										default:
											if (isMobile()) return <MobileHeader />;
											else return <Header articles={this.state.articles} />;
									}
								})()}
								<Switch location={location}>
									{markdownPaths}
									<Route exact path='/' render={(props) => <Page {...props} page='main' />} />
									<Route exact path='/articleData.json' render={() => JSON.stringify(this.state.articles, null, 4)} />
									<Route exact path='version' render={() => Package.version} />
									<Route exact path='/curr_news' render={(props) => <News {...props} title='Current News' articles={this.state.articles} />}/>
									<Route exact path='/auth' render={() => <Auth />} />
									<Route exact path='/callback/:service/' render={(props) => <Callback {...props} />} />
									<Route path='*' component={NotFound} status={404} />
								</Switch>
							</>
						);
					}}/>
				</Router>
			</SessionContext.Provider>
		);
	}
}