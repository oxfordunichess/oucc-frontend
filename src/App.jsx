import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Page from './pages/Page';
import Table from './pages/Table';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			index: {}
		}
	}

	static async getIndex() {
		try {
			let url = 'index.json?token=' + Math.random().toString(36).slice(2);
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
						return (
							<Route exact path={'/' + k} key={k + '_route'} render={(props) => {
								if (v.open) window.open(v.open);
								if (v.redirect) return <Redirect to={v.redirect} />;
								return <Page {...props} page={k} title={v.title} parent={v.parent} />;
							}} />
						)
					})}
					<Route exact path='/' render={() => <Page page='main' />} />
					<Route exact path='/contact' render={() => <Contact title='Contact' parent='contact'/>}/>
					{/*[
						'committee'
					].map(path => <Route exact key={path + '_route'} path={'/' + path} render={(props) => <Table {...props} file={path} />} />)*/}
					<Route path='*' component={NotFound} status={404} />
				</Switch>
			</Router>
		);
	}
}