import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../css/header.module.css';

//[link, name, wide, display]
const navigation = {
    news: [
        [
            "/curr_news",
            "Current News",
            false,
            true
        ],
        [
            "/old_news",
            "News Archive",
            false,
            true
        ]
    ],
    leagues: [
        [
            "/boxleague",
            "Club League",
            true,
            false
        ],
        [
            "/leagues",
            "Teams",
            false,
            true
        ],
        [
            "/termcard",
            "Termcard",
            true,
            true
        ],
        [
            "/1stTeam",
            "1st Team",
            false,
            true
        ],
        [
            "/2ndTeam",
            "2nd Team",
            false,
            true
        ],
        [
            "/3rdTeam",
            "3rd Team",
            false,
            true
        ],
        [
            "/classes",
            "Classes",
            false,
            true
        ]
    ],
    members: [
        [
            "/membership",
            "Membership",
            false,
            true
        ],
        [
            "/committee",
            "Current Committee",
            false,
            true
        ],
        [
            "/historical_committee",
            "Past Officers",
            false,
            true
        ]
    ],
    contact: [
        [
            "/contact",
            "Contact Us",
            false,
            true
        ],
        [
            "/maillists",
            "Join our Mailing Lists",
            false,
            true
        ]
	],
	sponsors: [],
    tournament: [
        [
            "/tournament",
            "Tournament",
            false,
            true
        ],
        [
            "/other_events",
            "Alumni day",
            false,
            true
        ]
    ]
};

const pages = {
    news: 'News',
    members: 'Membership',
    leagues: 'Play',
    varsity: 'Varsity',
    contact: 'Contact',
	sponsors: 'Sponsors',
	tournament: '150 Years'
};

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subnav: []
		}
	}

	componentDidMount() {
		Object.entries(navigation).forEach(([k, v]) => {
			if (window.location.pathname.slice(1).startsWith(k)) {
				this.setState({subnav: v})
			}
		})
	}

	render() {
		return (
			<div className={styles.header}>
				<div className={styles.inner_header}>
					<div className={styles.banner}>
						<Link className={styles.oucc_logo} to="/"/>
						<ul className={styles.nav}>
							{Object.entries(pages).map(([link, name]) => <li key={link}><Link to={'/' + link}>{name}</Link></li>)}
						</ul>
					</div>
				</div>
				<div className={styles.subnav_container}>
					<ul className={styles.subnav}>
						{this.state.subnav.map(([link, name, wide, display]) => display ? <li key={link.slice(1)}><Link to={link}>{name}</Link></li> : null)}
					</ul>
				</div>
			</div>
		)
	}

}

//eslint-disable-next-line no-unused-vars
function listToArray(dom) {
	let elements = dom.match(/<ul className=[\S\s]*?<\/ul>/g);
	return elements.map(line => {
		let entries = line.match(/[\s\S]*?Link to="(.*?)"((?: data-wide)?).*?>(.*?)</g)
		return entries.map(arr => {
			return arr.map(line => {
				let raw = line.match(/[\s\S]*?Link to="(.*?)"((?: data-wide)?).*?>(.*?)</);
				let groups = raw.slice(1);
				let ordered = groups.map(([link, wide, name]) => [link, name.trim(), !!wide, true]);
				return ordered;
			})
		})
	});
}