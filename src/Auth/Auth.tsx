import React, {ReactElement, useState} from 'react';

//import sha256 from 'sha256';

import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import { isMobile } from '../utils/auth';
//import MD5 from 'md5';

import styles from '../css/page.module.css';
import componentStyles from '../css/components.module.css';
//import { lichess } from './config';
import axios from '../utils/axios';
//import { capitalise } from '../utils/prototype';
/*
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'oxfordunichess@gmail.com',
		pass: process.env.PASSWORD
	}
});*/

function mailchimpMail(email: string) {
	return axios.get('http://simple-lichess-keygen.glitch.me/send?email=' + email)
}

/* Again we've been done dirty by CORS
function mailchimpMail(email: string) {
	let [FNAME, LNAME] = email.split('@')[0].split('.').map(v => capitalise(v));
	let hash = MD5(email);
	return axios({
		method: 'POST',
		url: `https://us20.api.mailchimp.com/3.0/lists/67a52a5dfd/members/${hash}/events`,
		data: {
			name: 'lichess-team-registration'
		}
	})
		.catch(() => {
			return axios({
				method: 'POST',
				url: `https://us20.api.mailchimp.com/3.0/lists/67a52a5dfd/members`,
				data: {
					email_address: hash,
					status: 'subscribed',
					merge_fields: { FNAME, LNAME }
				}
			})
		});
}


function sendMail(email: string) {
	let mailOptions = {
		from: 'youremail@gmail.com',
		to: 'myfriend@yahoo.com',
		subject: 'Sending Email using Node.js',
		html: (<div>
			<div>
				<img src="https://lichess1.org/assets/favicon.svg" alt="lichess.org"/>
				<h1>Authorize lazy-lila</h1>
			</div>
			<a>
				<div>
					<button type="submit" name="authorize">Log into Lichess</button>
				</div>
			</a>
			<footer>
				Open Authorization using the <a href={generateLink(email)}>Lichess API</a> through<br /><a
					href="https://github.com/theLAZYmd/lazy-lila">lazy-lila</a> for Node.JS
			</footer>
		</div>).toString()
	}
	return new Promise((res, rej) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) rej(error);
			else res(info);
		});
	});
}
*/ /*
function generateLink(email: string): string {
	return 'https://oauth.lichess.org/oauth/authorize?' + [
		'response_type=code',
		'client_id=' + lichess.id,
		'redirect_uri=' + lichess.redirectUri,
		'scope=team:write',
		'state=' + email + '|' + sha256(email)
	].join('&')
}*/

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
		setSuccess('Email sent!')
		setError('');
		await mailchimpMail(input.value);
		form.reset();
	}

	return (
		<>				
			<Helmet>
				<title>Authentication | OUCC</title>
			</Helmet>
			<div className={[styles.page, isMobile() ? styles.mobilePage : ''].join(' ')}>
				<div className={[styles.main, isMobile() ? styles.mobileMain : ''].join(' ')}>
					<div className={styles.section}>
						<h1>Lichess Authentication</h1>
						<h4>Input a valid University of Oxford email address to be added to the <a href='https://lichess.org/team/oxford-university-chess-club'>Lichess team</a>.</h4>
						<form className={componentStyles.contactForm} onSubmit={handleSubmit} style={{
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
					<Footer />	
				</div>
			</div>	
		</>
	);
}