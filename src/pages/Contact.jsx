import React from 'react';
import Title from 'react-document-title';

import Header from '../common/header';
import Sidebar from '../common/sidebar';

export default class Page extends React.Component {

	render() {
		return (
			<>
				<Title title={this.props.title ? this.props.title + ' | OUCC' : 'OUCC'} />
				<Header/>
				<div id="page">
					<Sidebar/>
					<div id="main">
					<h1>Contact Us</h1>
					<br/>
					If you have any questions or wish to contact the club then please complete the form below and we will get back to you as soon as possible.
						<form id="contact_form" method="POST" action="http://users.ox.ac.uk/cgi-bin/safeperl/chess/mailme.pl">
							<table id="contact_table">
								<tbody>
									<tr>
										<th>Name:</th>
										<td><input type="text" name="name" size="55"/></td>
									</tr>
									<tr>
										<th>Email:</th>
										<td><input type="text" name="email" size="55"/></td>
									</tr>
									<tr>
										<th>Subject:</th>
										<td><input type="text" name="subject" size="55"/></td>
									</tr>
									<tr>
										<th>Your Message:</th>
										<td><textarea name="message" rows="6"/></td>
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
		)
	}
}
