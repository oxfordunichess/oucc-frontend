import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {

	render() {
		return (
			<div id="header">
				<div id="inner_header">
					<div id="banner">
						<Link id="oucc_logo" to="/"/>
						<ul id="nav">
							<li><Link to="/news">News</Link></li>
							<li><Link to="/members">Membership</Link></li>
							<li><Link to="/play">Play</Link></li>
							<li><Link to="/varsity">Varsity</Link></li>
							<li><Link to="/contact_us">Contact</Link></li>
							<li><Link to="/sponsors">Sponsors</Link></li>
							<li><Link to="/150_years">150 years</Link></li>
						</ul>
					</div>
				</div>
				<div id="subnav_container">
					<ul id="subnav">
						<li id="empty">&nbsp;</li>
					</ul>
				</div>
				<ul className="links" data-section="news">
					<li><Link to="/curr_news">Current News</Link></li>
					<li><Link to="/old_news">News Archive</Link></li>
				</ul>
				<ul	className="links" data-section="play">
					<li><Link to="/boxleague" data-wide="1">Club League</Link></li>
					<li><Link to="/leagues">Teams</Link></li>
					<li><Link to="/termcard" data-wide="1">Termcard</Link></li>
					<li><Link to="/1stTeam"> 1st Team</Link></li>
					<li><Link to="/2ndTeam"> 2nd Team</Link></li>
					<li><Link to="/3rdTeam"> 3rd Team</Link></li>
					<li><Link to="/classes"> Classes</Link></li>
				</ul>
				<ul className="links" data-section="members">
					<li><Link to="/membership">Membership</Link></li>
					<li><Link to="/committee">Current Committee</Link></li>
					<li><Link to="/historical_committee">Past Officers</Link></li>
				</ul>
				<ul className="links" data-section="contact_us">
					<li><Link to="/contact">Contact Us</Link></li>
					<li><Link to="/maillists">Join our Mailing Lists</Link></li>
				</ul>
				<ul className="links" data-section="150_years">
					<li><Link to="/tournament">Tournament</Link></li>
					<li><Link to="/other_events">Alumni day</Link></li>
				</ul>
			</div>
		)
	}

}