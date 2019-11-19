import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../css/header.module.css';

//[link, name, wide, display]
import navigation from './navigation.json';

const regexes = {
	space: /\s+/g,
	letters: /\w+/g
}

const fps = 60;

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
			subnav: '',
			feedPosition: 0
		}
	}

	getParents(link) {
		if (navigation[link]) return navigation[link];
		return [];
	}

	getCurrent() {
		return (Object.entries(navigation).find(([k, v]) => {
			if (window.location.pathname.slice(1).includes(k)) {
				console.log(v);
				return v;
			}
		}) || [, null])[0];
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
										<li key={link.slice(1)} className={window.location.pathname.includes(link.slice(1)) ? styles.selected : ''}>
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

	componentDidUpdate() {
		if (this.state._width) return;
		if (this.refs.dummy) this.state._width = this.refs.dummy.scrollWidth;
	}

	componentDidMount() {
		setInterval(() => {
			let feedPosition = this.state.feedPosition;
			this.setState({
				feedPosition: feedPosition + 0.5
			})
		}, 1000 / fps)
	}

	static setSection(location, id) {
		return process.env.PUBLIC_URL + '/curr_news#' + id;
	}

	getNewsFeed() {
		return this.props.articles.map((text, i) => {
			if (typeof text !== 'string') return null;
			if (!text || typeof text.split !== 'function') {
				console.error('Bad Markdown document:\n', text);
				return null;
			}
			let lines = text.split('\n');
			let header = lines.shift().trim();
			while (header.startsWith('#')) {
				header = header.slice(1);
			}
			let id = header.match(regexes.letters).join('-').toLowerCase();
			return [<a href={this.constructor.setSection(window.location, id)} key={id} style={{
				left: -this.state.feedPosition
			}}>{header}</a>, ' • ']
		})
	}

	render() {
		let transformation = - this.state.feedPosition % this.state._width;
		return (
			<div className={styles.header}>
				<div className={styles.banner}>
					{this.renderNav('left')}
					<Link className={styles.oucc_logo} to='/' style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/images/oucclogo.jpg`
					}}/>
					{this.renderNav('right')}
				</div>
				<div className={styles.newsFeed}>
					<div className={styles.intro}>
						Latest News: 
					</div>
					<div></div>
					<div className={styles.runner}>
						<div ref='runner' style={{
							transform: `translate3d(${transformation}px, 0, 0)`
						}}>
							{this.getNewsFeed()}
						</div>
						<div ref='dummy' style={{
							visibility: 'hidden'
						}}>
							{this.getNewsFeed()}
						</div>
					</div>
					<div></div>
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