import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Page from './pages/Page';
import NotFound from './pages/NotFound';

export default class App extends React.Component {

	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Switch>
					<Route exact path='/' render={() => <Page page='main' />} />
					<Route exact path='/members' render={() => <Redirect to='/membership' />} />
					<Route exact path='/index.html' render={() => <Redirect to='/' />} />
					<Route path='/termcard' render={() => <Redirect to='https://unioxfordnexus-my.sharepoint.com/:x:/g/personal/chri5551_ox_ac_uk/EQAUw-Mpt6pMoKx93Y8MFM0BQSwz7Xsqx1vJ54r5SILOrA' />} />
					{[
						'1stTeam',
						'2ndTeam',
						'3rdTeam',
						'archive',
						'archive2',
						'classes',
						'curr_news',
						'leagues',
						'mallists',
						'main',
						'membership',
						'termcard',
						'varsiyy'
					].map(path => <Route exact key={path + '_route'} path={'/' + path} render={(props) => <Page {...props} page={path} />} />)}
					<Route path='*' component={NotFound} status={404} />
				</Switch>
			</Router>
		);
	}
}