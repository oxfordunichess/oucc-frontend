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
			index: null
		}
	}

	componentDidMount() {

	}

	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Switch>
					<Route exact path='/' render={() => <Page page='main' />} />
					<Route exact path='/members' render={() => <Redirect to='/membership' />} />
					<Route exact path='/contact' render={() => <Contact />}/>
					<Route exact path='/index.html' render={() => <Redirect to='/' />} />
					<Route path='/termcard' render={() => {
						window.open('https://unioxfordnexus-my.sharepoint.com/:x:/g/personal/chri5551_ox_ac_uk/EQAUw-Mpt6pMoKx93Y8MFM0BQSwz7Xsqx1vJ54r5SILOrA')
						return <Redirect to='/leagues'/>
					}} />
					{[
						'1stTeam',
						'2ndTeam',
						'3rdTeam',
						'archive',
						'archive2',
						'classes',
						'curr_news',
						'leagues',
						'maillists',
						'main',
						'membership',
						'termcard',
						'varsity'
					].map(path => <Route exact key={path + '_route'} path={'/' + path} render={(props) => <Page {...props} page={path} />} />)}
					<Route exact path='/committee' render={(props) => <Table {...props} file={'committee2019'} />} />
					{/*[
						'committee'
					].map(path => <Route exact key={path + '_route'} path={'/' + path} render={(props) => <Table {...props} file={path} />} />)*/}
					<Route path='*' component={NotFound} status={404} />
				</Switch>
			</Router>
		);
	}
}