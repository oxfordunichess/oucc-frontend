import React, {ReactElement, useState} from 'react';

const styles = require('css/page.module.css');
const componentStyles = require('css/components.module.css');
import axios from '../utils/axios';
import { GetStaticProps } from 'next';
import { getNews } from './api/articles';
import { getNavigation } from './api/navigation';

function mailchimpMail(email: string) {
	return axios.get('http://simple-lichess-keygen.glitch.me/send?email=' + email)
}

export default function Auth(): ReactElement {

	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		let form = e.target as HTMLFormElement;
		let input = Array.from(form.elements).find(e => ('name' in e) && e['name'] === 'email') as HTMLInputElement;
		let email = input.value.trim();
		if (!email.includes('@') || !email.endsWith('ox.ac.uk')) {
			form.reset();
			setSuccess('');
			setError('Invalid Oxford University email address');
			return;
		}
		axios({
			url: form.action,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: { email }
		})
			.then(() => {
				setSuccess('Email sent!')
				setError('');
				form.reset();			
			})
			.catch(() => {
				setError('Error: email a committee member for help');
			})
	}

	return (
		<div className={styles.page}>
			<div className={styles.main}>
				<div className={styles.section}>
					<h1>Lichess Authentication</h1>
					<h4>Input a valid University of Oxford email address to be added to the <a href='https://lichess.org/team/oxford-university-chess-club'>Lichess team</a>.</h4>
					<form
						action='/api/callback/email'
						target='_blank'
						onSubmit={handleSubmit} 
						className={componentStyles.contactForm} style={{
							paddingTop: '20px'
						}}>
						<table className={componentStyles.contactTable}>
							<tbody>										
								<tr>
									<th>Email: </th>
									<td>
										<input type='text' name='email' size={55} />
									</td>
									<td>												
										<input type='submit' name='Submit' value='Send'/>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					{success || null}
					{error || null}
				</div>
				<div className={styles.section} style={{
					padding: '10px'
				}}>
					We can only contact subscribed members of our mailing list. If you enter your email above and you are not a subscribed member, you will instead receive an email asking you to subscribe. Return to this page once you have done so. Alternatively, subscribe here: <a href='https://mailchi.mp/e4bab2111329/oxfordunichess'>https://mailchi.mp/e4bab2111329/oxfordunichess</a>
				</div>
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async (ctx) => {

	const articles = await getNews();
	const navigation = await getNavigation();
	
	return {
		props: {
			articles,
			navigation,
			title: 'Authentication | OUCC',
			description: 'Automated system to login to Lichess team'
		},
		revalidate: 1
	};
};