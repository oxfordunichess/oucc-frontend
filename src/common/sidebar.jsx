import React from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends React.Component {

	render() {
		return (
			<div id="sidebar">
				<div id="facebook_pane">
					<a href="https://www.facebook.com/groups/oxford.chess.club/">
						<img alt="Find us on facebook button" id="fb_logo" src={process.env.PUBLIC_URL + 'images/fblogo.png'}/>
					</a>
				</div>
				<div id="next_event">
					<ul>
						<h1>Upcoming Events:</h1>
						<li>Town vs Gown (May 19th)</li>
						<li>OUCC celebrates 150th anniversary</li>
					</ul>
				</div>
				<div id="news_hlines">
					{/*how david meant it: #include virtual="hlines.html"*/}
					<h1>Recent News:</h1>
					<ul>
						<li>Oxford win Varsity!</li>
						<li>OUCC 1 win ODCL Div 1</li>
					</ul>
					<Link to="/curr_news">View current news</Link>
				</div>
				<div id="puzzle_pane">
					<iframe
						id="puzzle"
						width="256"
						scrolling="no"
						height="293"
						frameBorder="0"
						title="puzzle"
						src="https://www.shredderchess.com/online/playshredder/gdailytactics.php?mylang=en&mysize=26"
					/>
				</div>
			</div>
		)
	}
}