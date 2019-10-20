import React from 'react';
import {Link} from 'react-router-dom';
import Title from 'react-document-title';

import Header from '../common/header';
import Sidebar from '../common/sidebar';

export default class NotFound extends React.Component {
	render() {
		return (
			<>
				<Title title={this.props.title ? this.props.title + ' | OUCC' : 'OUCC'} />
				<Header/>
				<div id="page">
					<Sidebar/>
					<h1>404: Not found</h1>
					<h3><Link to='/'>Return to home</Link></h3>
				</div>
			</>
		);
	}
}