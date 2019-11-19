import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Header from '../common/header';
import Sidebar from '../common/sidebar';

export default class NotFound extends React.Component {
	render() {
		return (
			<>				
				<Helmet>
					<title>{this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}</title>
				</Helmet>
				<div id="page">
					<h1>404: Not found</h1>
					<h3><Link to='/'>Return to home</Link></h3>
				</div>
			</>
		);
	}
}