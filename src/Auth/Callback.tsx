import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';

import simpleOauth from 'simple-oauth2';
import lichess from 'lichess';
import { isDev, isMobile } from '../utils/auth';
import axios from '../utils/axios';
import * as config from './config';

import styles from '../css/page.module.css';

interface Token {
	scopes: string
	token_type: string
	expires_in: number
	access_token: string
	refresh_token: string
	expires_at: string
}

/**
 * https://oauth.lichess.org/oauth/authorize?response_type=code&client_id=5vJ1ikA0qNR21fk7&redirect_uri=http://localhost:3000/callback/lichess&scope=team:write&state=aloysius.lip@chch.ox.ac.uk
 * https://oauth.lichess.org/oauth/authorize?response_type=code&client_id=LwK306sbKWFHIzlV&redirect_uri=http://users.ox.ac.uk/~chess/callback/lichess&scope=team:write&state=aloysius.lip@chch.ox.ac.uk;
 * */

const oauth2 = simpleOauth.create({
	client: {
		id: config.lichess.id,
		secret: config.lichess.secret,
	},
	auth: {
		tokenHost: config.lichess.tokenHost,
		tokenPath: config.lichess.tokenPath,
		authorizePath: config.lichess.authorizePath,
	},
});

export default class Auth extends React.Component<{
	match: {
		params: {
			service: 'lichess' | 'chesscom' | 'fide' | 'ecf'
		}
	},
	location: {
		search: string
	}
}, {
	success: boolean | undefined
}> {

	public state = {
		success: undefined as boolean | undefined
	}


	async verify(code: string, service: 'lichess'): Promise<void> {
		try {
			/*
			const result = await oauth2.authorizationCode.getToken({
				code,
				redirect_uri: config[service].redirectUri
			});			
			const access = oauth2.accessToken.create(result); */ // Tradition OAuth doesn't work due to CORS restrictions with lichess
			let { data } = await axios.get('https://simple-lichess-keygen.glitch.me/gen?code=' + code + '&dev=' + (isDev() ? 'true' : 'false')) as { data: Token };
			
			if (!data.access_token) throw data;
			/*
			const lila = new lichess();
			lila.setToken(data.access_token);
			return await lila.teams.join('oxford-university-chess-club');
			*/ //Again, we've been CORS-ed

			await axios.get('https://simple-lichess-keygen.glitch.me/join?token=' + data.access_token);
		} catch(e) {
			console.error(e);
			throw '';
		}
	}

	async componentDidMount() {
		let service = this.props?.match?.params.service;
		let searchString = this.props?.location?.search || '?';
		let { code, state } = searchString.slice(1).split('&').reduce((acc, curr) => {
			let [k, v] = curr.split('=') as ['code' | 'state', string];
			acc[k] = v;
			return acc;
		}, {} as {
			code: string,
			state: string
		});
		console.log(code);
		await this.verify(code, service as 'lichess')
			.then(() => this.setState({ success: true }))
			.catch(() => this.setState({ success: false }))
	}
	
	render(): ReactElement {
		if (typeof this.state.success === 'undefined') return null;
		return (
			<>				
				<Helmet>
					<title>Authentication | OUCC</title>
				</Helmet>
				<div className={[styles.page, isMobile() ? styles.mobilePage : ''].join(' ')}>
					<div className={[styles.main, isMobile() ? styles.mobileMain : ''].join(' ')}>
						<div className={styles.section}>
						<h1>{this.state.success ? 'Successfully Authorised' : 'Failed to authorise'}</h1>
							<h3><a href='https://lichess.org/team/oxford-university-chess-club' target='_blank' rel='noopener noreferrer'>
								View team on Lichess.org
							</a></h3>
						</div>
						<Footer />	
					</div>
				</div>
			</>
		);
	}
}