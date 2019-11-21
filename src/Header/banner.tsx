import React, {ReactElement, ReactPropTypes} from 'react';
import {Link} from 'react-router-dom';
import {isDev} from '../utils/auth';
import {Side, NavCache, NavigationData} from './interfaces';
import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

const styles = require('../css/header.module.css')

export default class Runner extends React.Component <{}, {
	subnav: string,
	navigation: NavigationData
}> {

	private _nav: NavCache;

	constructor(props: ReactPropTypes) {
		super(props);
		this.navEnter = this.navEnter.bind(this);
		this.navLeave = this.navLeave.bind(this);
		this.state = {
			subnav: '',
			navigation: {}
		};
	}
	

	navEnter(subnav: string): void {
		this.setState({subnav});
	}

	navLeave(): void {
		this.setState({subnav: ''});	
	}

	getNavigationData(): Promise<NavigationData> {
		return axios('navigation.json' + (isDev() ? '?token=' + Math.random().toString(16).slice(2) : ''))
			.then(res => res.data)
			.catch(console.error);
	}

	renderNav(side: Side): ReactElement {
		if (!this._nav) this._nav = {};
		//if (this._nav[side]) return this._nav[side];
		let nav = (
			<div className={styles.nav + ' ' + styles[side]}>
				{Object.entries(this.state.navigation).map(([link, [s, name, ...parents]], i) => {
					if (s !== side) return null;
					return (
						<div key={[name, i].join('.')} className={styles.listing} onMouseEnter={() => this.navEnter(link)} onMouseLeave={() => this.navLeave()}>
							<div>
								<Link
									key={link} to={'/' + link}>{name}
								</Link>
							</div>
							{parents.length && this.state.subnav === link ? <ul className={styles.subnav}>
								{(parents).map(([link, name, _wide, display]) => {
									if (!display) return null;
									return (
										<li key={link.slice(1)} className={window.location.pathname.includes(link.slice(1)) ? styles.selected : ''}>
											<Link to={link}>{name}</Link>
										</li>
									);
								})}
							</ul> as ReactElement : null}
						</div>
					);
				})}
			</div>
		);
		if (Object.keys(this.state.navigation).length) return this._nav[side] = nav;
		else return nav;
	}

	async componentDidMount(): Promise<void> {
		this.setState({
			navigation: await this.getNavigationData()
		});
	}

	render(): ReactElement {
		return (
			<div className={styles.banner}>
				{this.renderNav('left')}
				<Link className={styles.oucc_logo} to='/' style={{
					backgroundImage: `url(${process.env.PUBLIC_URL}/images/oucclogo.jpg`
				}}/>
				{this.renderNav('right')}
			</div>
		);
	}
}