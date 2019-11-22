import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Side, NavCache, NavigationData, BannerProps} from './interfaces';
import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

const styles = require('../css/header.module.css')

export default class Banner extends React.Component <{
	sessionID: string
}, {
	subnav: string,
	navigation: NavigationData
}> {

	private _nav: NavCache;

	constructor(props: BannerProps) {
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
		return axios({
			url: 'navigation.json',
			params: {sessionID: this.props.sessionID}
		 })
			.then(res => res.data)
			.catch(console.error);
	}

	renderNav(side: Side): ReactElement {
		if (!this._nav) this._nav = {};
		let nav = (
			<div className={styles.nav + ' ' + styles[side]}>
				{Object.entries(this.state.navigation).map(([link, [s, name, ...parents]], i) => {
					if (s !== side) return null;
					return (
						<div key={[name, i].join('.')} className={styles.listing} onMouseEnter={() => this.navEnter(link)} onMouseLeave={() => this.navLeave()}>
							<div className={styles.dropParent}>
								<Link
									key={link} to={'/' + link}>{name}
								</Link>
							</div>
							{parents.length && this.state.subnav === link ? <div className={styles.dropDown}><ul className={styles.subnav}>
								{(parents).map(([link, name, _wide, display]) => {
									if (!display) return null;
									return (
										<li key={link.slice(1)} className={window.location.pathname.includes(link.slice(1)) ? styles.selected : ''}>
											<Link to={link}>{name}</Link>
										</li>
									);
								})}
							</ul></div> as ReactElement : null}
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