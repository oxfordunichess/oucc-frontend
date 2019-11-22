import React, {ReactElement} from 'react';
import {Helmet} from 'react-helmet';

export default class Page extends React.Component<{
	title: string,
	sessionID: string
}> {

	render(): ReactElement {
		return (
			<>
				<Helmet>
					<title>{this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}</title>
				</Helmet>
				<div id="page">
					<div id="main">
						<h1>Contact Us</h1>
						<br/>
						If you have any questions or wish to contact the club then please complete the form below and we will get back to you as soon as possible.
						<form id="contact_form" method='POST' action="http://users.ox.ac.uk/cgi-bin/safeperl/chess/mailme.pl">
							<table id="contact_table">
								<tbody>									
									{Object.entries({
										name: 'Name',
										email: 'Email',
										subject: 'Subject'
									}).map(([k, v], i) => {
										return (
											<tr key={['contact', i].join('.')}>
												<th>{v + ':'}</th>
												<td>
													<input type='text' name={k} size={55}/>
												</td>
											</tr>
										)
									})}									
									<tr>
										<th>Your Message:</th>
										<td><textarea name='message' rows={6}/></td>
									</tr>
								</tbody>
							</table>
							<br/>
							<input type="submit" name="submit" value="Send"/>
							<input type="reset" value="Clear Form"/>
						</form>
					</div>
				</div>
			</>
		);
	}
}
