import React, { ReactElement, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Side, NavCache, NavigationData } from './interfaces';
import axios from '../utils/axios';
import { SessionContext } from '../utils/contexts';

const styles = require('../css/header.module.css');

export default class Banner extends React.Component <{}, {
	subnav: string,
	navigation: NavigationData,
}> {

	static contextType = SessionContext;
	public context: React.ContextType<typeof SessionContext>;

	private _nav?: NavCache;

	public state = {
		subnav: 'members',
		navigation: {} as NavigationData,
	}

	private navToggle(subnav: string): void {
		if (this.state.subnav === subnav) this.navLeave();
		else this.navEnter(subnav);
	}

	private navEnter(subnav: string): void {
		this.setState({subnav});
	}

	private navLeave(): void {
		this.setState({subnav: ''});	
	}

	private renderNav(side: Side): ReactElement {
		if (!this._nav) this._nav = {};
		let nav = (
			<div
				className={styles.nav + ' ' + styles[side]}
			>
				{side !== 'left' ? null : <div className={styles.section}>
					<div className={styles.spacer} />
				</div>}
				{Object.entries(this.state.navigation).map(([link, [s, name, ...parents]], i) => {
					if (s !== side) return null;
					return (
						<div
							key={[name, i].join('.')}
							className={styles.section}
							onClick={() => this.navToggle(link)}
							onMouseEnter={() => this.navEnter(link)}
							onMouseLeave={() => this.navLeave()}
						>
							<Link
								className={styles.dropParent}
								key={link} to={'/' + link}>{name}
							</Link>
							{parents.length && this.state.subnav === link ? (parents).map(([link, name]) => {
								return (
									<Link key={link.slice(1)} to={link} className={[
										styles.dropParent,
										styles.dropChild,
										window.location.pathname.includes(link.slice(1)) ? styles.selected : ''
									].join(' ')}>
										{name}
									</Link>
								);
							}) : null}
						</div>
					);
				})}
				{side !== 'right' ? null : <div className={styles.section}>
					<div className={styles.spacer} />
				</div>}
			</div>
		);
		if (Object.keys(this.state.navigation).length) return this._nav[side] = nav;
		else return nav;
	}

	private getNavigationData(): Promise<NavigationData> {
		return axios({
			url: 'navigation.json',
			params: {sessionID: this.context}
		 })
			.then(res => res.data)
			.catch(console.error);
	}

	componentDidMount(): void {
		this.getNavigationData()
			.then((navigation) => {
				if (navigation) this.setState({ navigation });
			});
	}

	render(): ReactElement {
		return (
			<div className={styles.bannerContainer}>
				<div className={styles.banner}>
					{this.renderNav('left')}
					<Link className={styles.oucc_logo} to='/' style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/images/oucclogo.jpg`,
						overflowY: 'visible'
					}}/>
					{this.renderNav('right')}
				</div>
			</div>
		);
	}
}