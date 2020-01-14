import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { NavigationData } from './interfaces';
import { SessionContext } from '../utils/contexts';
import axios from '../utils/axios';

import styles from '../css/header.module.css';

export default class Header extends React.Component<{}, {
	subnav: string,
	expanded: boolean,
	navigation: NavigationData,
}> {

	static contextType = SessionContext;
	public context: React.ContextType<typeof SessionContext>;

	public state = {
		subnav: '',
		expanded: false,
		navigation: {} as NavigationData
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
				this.setState({ navigation });
			});
	}

	private navToggle = (link: string) => {
		if (this.state.subnav === link) this.setState({ subnav: '' });
		else this.setState({ subnav: link });
	}

	private toggleThumb = () => {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	render(): ReactElement {
		return (
			<>
				<div className={styles.header}>
					<div className={styles.bannerContainer}>
						<div className={styles.banner}>
							<div className={styles.mobileHeader}>
								Oxford University Chess Club
							</div>
						</div>
					</div>
				</div>
				<div className={styles.mobileMenu}>
					<div className={styles.mobileLinks} style={{
						visibility: this.state.expanded ? 'visible' : 'hidden'
					}}>
						{Object.entries(this.state.navigation).map(([link, [_s, name, ...parents]], i) => {
							return (
								<div key={[name, i].join('.')} className={styles.mobileSection} >
									{!parents.length ?
										<Link className={styles.dropParent} to={'/' + link}>
											{name}
										</Link> :
										<>
											<div className={styles.dropParent} onClick={() => this.navToggle(link)}>
												{parents.length ? this.state.subnav === link ? '▽' : '▷' : ''} {name}
											</div>
											{this.state.subnav === link ? (parents).map(([link, name]) => {
												return (
													<Link key={link.slice(1)} className={[styles.dropParent, styles.dropChild].join(' ')} to={link}>
														{name}
													</Link>
												);
											}) : null}
										</>
									}
									
								</div>
							);
						})}
					</div>
					<div className={styles.mobileThumbContainer} onClick={this.toggleThumb}>
						<img src={process.env.PUBLIC_URL + '/images/oucclogo.jpg'} alt='' />
					</div>
				</div>
			</>
		);
	}

}