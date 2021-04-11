import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Token } from 'simple-oauth2';
import { isDev } from '../../utils/auth';
import axios from '../../utils/axios';

const styles = require('css/page.module.css');

export default function Auth(props: {
	service: string
}) {

	const router = useRouter();

	const [success, setSuccess] = useState(undefined as boolean | undefined);

	const verify = useCallback(async (code: string): Promise<void> => {
		try {
			let { data } = await axios({
				method: 'GET',
				url: '/gen',
				params: {
					code,
					dev: isDev() ? 'true' : 'false'
				}
			}) as { data: Token };
			
			if (!data.access_token) throw data;

			await axios({
				method: 'POST',
				url: '/api/join',
				params: {
					token: data.access_token
				}
			});
		} catch(e) {
			console.error(e);
			throw '';
		}
	}, []);

	const { code, state } = router.query as { [key: string]: string };

	useEffect(() => {
		verify(code)
			.then(() => setSuccess(true))
			.catch(() => setSuccess(false));
	}, [verify]);

	if (typeof success === 'undefined') return null;

	return (
		<div className={styles.page}>
			<div className={styles.main}>
				<div className={styles.section}>
				<h1>{success ? 'Successfully Authorised' : 'Failed to authorise'}</h1>
					<h3>
						<a href='https://lichess.org/team/oxford-university-chess-club' target='_blank' rel='noopener noreferrer'>
							View team on Lichess.org
						</a>
					</h3>
				</div>
			</div>
		</div>
	);
		
}