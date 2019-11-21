import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

export default class NotFound extends React.Component<{
	title: string
}> {
	
	render(): ReactElement {
		return (
			<>				
				<Helmet>
					<title>{this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}</title>
				</Helmet>
				<div id='main'>
					<h1>404: Not found</h1>
					<h3><Link to='/'>Return to home</Link></h3>
				</div>
			</>
		);
	}
}