import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../css/header.module.css';

//[link, name, wide, display]
import navigation from './navigation.json';
import { normalize } from 'path';

const nav = {
		left: {
		news: 'News',
		leagues: 'Play',
		varsity: 'Varsity',
	},
	right: {
		members: 'Membership',
		contact: 'Contact',
		sponsors: 'Sponsors',
		tournament: '150 Years'
	}
}

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		this.navEnter = this.navEnter.bind(this);
		this.navLeave = this.navLeave.bind(this);
		this.state = {
			subnav: ''
		}
	}

	getParents(link) {
		if (navigation[link]) return navigation[link];
		Object.entries(navigation).forEach(([k, v]) => {
			if (window.location.pathname.slice(1).includes(k)) {
				return v;
			}
		});
		return [];
	}

	navEnter(subnav) {
		this.setState({subnav})
	}

	navLeave() {
		this.setState({subnav: ''})	
	}

	renderNav(side) {
		return (
			<div className={styles.nav + ' ' + styles[side]}>
				{Object.entries(nav[side]).map(([link, name], i) => {
					let parents = this.getParents(link);
					return (
						<div key={[name, i].join('.')} className={styles.listing} onMouseEnter={() => this.navEnter(link)} onMouseLeave={() => this.navLeave(link)}>
							<div>
								<Link
									key={link} to={'/' + link}>{name}
								</Link>
							</div>
							{parents.length && this.state.subnav === link ? <ul className={styles.subnav} refs={link}>
								{(parents).map(([link, name, _wide, display]) => {
									if (!display) return null;
									return (
										<li key={link.slice(1)}>
											<Link to={link}>{name}</Link>
										</li>
									);
								})}
							</ul> : null}
						</div>
					);
				})}
			</div>
		);
	}

	render() {
		return (
			<div className={styles.header}>
				<div className={styles.banner}>
					{this.renderNav('left')}
					<Link className={styles.oucc_logo} to='/' style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/images/oucclogo.jpg`
					}}/>
					{this.renderNav('right')}
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