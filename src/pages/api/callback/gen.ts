import { NextApiHandler } from 'next';
import { AccessToken, AuthorizationCode, ModuleOptions } from 'simple-oauth2';
import { lichess as config } from 'components/Auth/config';

const cache: Map<string, AccessToken> = new Map();

const handler: NextApiHandler = async (req, res) => {

	let code = req.query.code as string;
	
	try {
		const secret = process.env.LICHESS_SECRET;
	
		let oauth2 = new AuthorizationCode({
			client: {
				id: config.id,
				secret,
			},
			auth: {
				tokenHost: config.tokenHost,
				tokenPath: config.tokenPath,
				authorizePath: config.authorizePath,
			},
		} as ModuleOptions<'client_id'>);
		
		let result = cache.get(code);
		if (!result) {
			result = await oauth2.getToken({
				code,
				redirect_uri: config.redirectUri
			});
			cache.set(code, result);
		};
		const access = result.token;
		res.json(access.token);
	} catch (e) {
		console.error(e);
		res.send(typeof e === 'string' ? e : e.message);
	}
}

export default handler;