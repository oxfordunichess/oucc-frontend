import React from 'react';
import {Link} from 'react-router-dom';
import {isDev} from '../utils/auth';
import styles from '../css/header.module.css';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Runner extends React.Component {

	constructor(props) {
		super(props);
		this.navEnter = this.navEnter.bind(this);
		this.navLeave = this.navLeave.bind(this);
		this.state = {
			subnav: '',
			navigation: {}
		}
	}
	

	navEnter(subnav) {
		this.setState({subnav})
	}

	navLeave() {
		this.setState({subnav: ''})	
	}

	getNavigationData() {
		return axios('navigation.json' + (isDev() ? '?token=' + Math.random().toString(16).slice(2) : ''))
			.then(res => res.data)
			.catch(console.error)
	}

	renderNav(side) {
		if (!this._nav) this._nav = {};
		//if (this._nav[side]) return this._nav[side];
		let nav = (
			<div className={styles.nav + ' ' + styles[side]}>
				{Object.entries(this.state.navigation).map(([link, [s, name, ...parents]], i) => {
					if (s !== side) return null;
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
		if (Object.keys(this.state.navigation).length) return this._nav[side] = nav;
		else return nav;
	}

	async componentDidMount() {
		this.setState({
			navigation: await this.getNavigationData()
		});
	}

	render() {
		return (
			<div className={styles.banner}>
				{this.renderNav('left')}
				<Link className={styles.oucc_logo} to='/' style={{
					backgroundImage: `url(${process.env.PUBLIC_URL}/images/oucclogo.jpg`
				}}/>
				{this.renderNav('right')}
			</div>
		)
	}
}