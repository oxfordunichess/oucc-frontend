import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Page from './pages/Page';
import News from './pages/News';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Calendar from './pages/Calendar';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			index: {}
		}
	}

	static isDev() {		
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			return true;
		} else {
			return false;
		}
	}

	static async getIndex() {
		try {
			let url = 'index.json' + (App.isDev() ? '?token=' + Math.random().toString(36).slice(2) : '');
			let req = await axios(url);
			return req.data;
		} catch (e) {
			console.error(e);
			return {};
		}
	}

	async componentDidMount() {
		let index = await this.constructor.getIndex();
		this.setState({index});
	}

	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
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
					<Route exact path='/curr_news' render={() => <News title='Current News' parent='News'/>}/>
					<Route exact path='/contact' render={() => <Contact title='Contact' parent='contact'/>}/>
					<Route exact path='/termcard' render={() => <Calendar
						title='Termcard' parent='termcard'
						start={(() => {
							return this.state.index._start})()}
						finish={this.state.index._finish}
					/>}/>
					<Route path='*' component={NotFound} status={404} />
				</Switch>
			</Router>
		);
	}
}