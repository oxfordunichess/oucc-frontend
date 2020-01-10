import React, { ReactElement, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Side, NavCache, NavigationData } from './interfaces';
import axios from 'axios';
import { SessionContext } from '../utils/contexts';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

const styles = require('../css/header.module.css');

export default class Banner extends React.Component <{}, {
	subnav: string,
	navigation: NavigationData,
	navLeft: number,
	navRight: number
}> {

	static contextType = SessionContext;
	public context: React.ContextType<typeof SessionContext>;

	private _nav: NavCache;
	private navLeft: RefObject<HTMLDivElement> = React.createRef();
	private navRight: RefObject<HTMLDivElement> = React.createRef();

	public state = {
		subnav: '',
		navigation: {} as NavigationData,
		navLeft: 0,
		navRight: 0
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
		let width = side === 'left' ? this.state.navLeft : this.state.navRight;
		let nav = (
			<div
				className={styles.nav + ' ' + styles[side]} 
				ref={side === 'left' ? this.navLeft : this.navRight}
				style={width ? {width} : {}}
			>
				{Object.entries(this.state.navigation).map(([link, [s, name, ...parents]], i) => {
					if (s !== side) return null;
					return (
						<div key={[name, i].join('.')} className={styles.listing} onClick={() => this.navToggle(link)} onMouseEnter={() => this.navEnter(link)} onMouseLeave={() => this.navLeave()}>
							<div className={styles.dropParent}>
								<Link
									key={link} to={'/' + link}>{name}
								</Link>
							</div>
							{parents.length && this.state.subnav === link ? <div className={styles.dropDown}><ul className={styles.subnav}>
								{(parents).map(([link, name]) => {
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

	private getNavigationData(): Promise<NavigationData> {
		return axios({
			url: 'navigation.json',
			params: {sessionID: this.context}
		 })
			.then(res => res.data)
			.catch(console.error);
	}

	private resizeNavs(): void {/*
		let widths = [this.navLeft.current.scrollWidth, this.navRight.current.scrollWidth];
		if (widths[0] === widths[1]) return;
		let max = Math.max(...widths);
		let obj = {} as BannerState;
		if (max !== widths[0]) obj.navLeft = max;
		if (max !== widths[1]) obj.navRight = max;
		this.setState(obj)*/
	}

	componentDidMount(): void {
		window.addEventListener('resize', this.resizeNavs);
		this.getNavigationData()
			.then((navigation) => {
				this.setState({ navigation });
			});
		this.resizeNavs();
	}

	componentWillUnmount(): void {
		window.removeEventListener('resize', this.resizeNavs);
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