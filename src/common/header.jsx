import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../css/header.module.css';

//[link, name, wide, display]
import navigation from './navigation.json';

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
			if (window.location.pathname.slice(1).includes(k)) {
				this.setState({subnav: v})
			}
		})
	}

	render() {
		return (
			<div className={styles.header}>
				<div className={styles.inner_header}>
					<div className={styles.banner} >
						<Link className={styles.oucc_logo} to='/' style={{
							backgroundImage: `url(${process.env.PUBLIC_URL}/images/oucclogo.jpg`
						}}/>
						<ul className={styles.nav}>
							{Object.entries(pages).map(([link, name]) => <li key={link}><Link to={'/' + link}>{name}</Link></li>)}
						</ul>
					</div>
				</div>
				<div className={styles.subnav_container}>
					<ul className={styles.subnav}>
						{(navigation[this.props.parent] || this.state.subnav).map(([link, name, wide, display]) => {
							if (!display) return null;
							return (
								<li key={link.slice(1)}>
									<Link to={link}>{name}</Link>
								</li>
							);
						})}
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