import { NextApiHandler } from 'next';
import MD5 from 'md5';
import axios from 'utils/axios';
import { capitalise } from 'utils/prototype';

const handler: NextApiHandler = (req, res) => {
	if (req.method !== 'POST') {
		res.status(405);
		return;
	}
	try {
		let email = req.body.email as string;
		let [FNAME, LNAME] = email.split('@')[0].split('.').map(v => capitalise(v));
		let hash = MD5(email);
		axios({
			method: 'POST',
			url: `https://us20.api.mailchimp.com/3.0/lists/67a52a5dfd/members/${hash}/events`,
			headers: {
				Authorization: 'Bearer ' + process.env.MAILCHIMP
			},
			data: {
				name: 'lichess-team-registration'
			}
		})
			.then(() => {
				console.log(email, hash);
				res.status(204);
			})
			.catch(() => {
				axios({
					method: 'POST',
					url: `https://us20.api.mailchimp.com/3.0/lists/67a52a5dfd/members`,
					data: {
						email_address: email,
						status: 'subscribed',
						merge_fields: { FNAME, LNAME }
					},
					headers: {
						Authorization: 'Bearer ' + process.env.MAILCHIMP
					},
				})
					.then(() => {
						console.log(email, hash);
						res.status(204);
					});
			});
	} catch (e) {
		res.status(400).send(format(e))
	}
}

export default handler;

function format(e: Error) {
	if (typeof e === 'string') return e;
	return e.message + '\n' + e.stack.toString();
}