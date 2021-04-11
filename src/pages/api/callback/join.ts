import { NextApiHandler } from 'next';
import lichess from 'lichess';

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405);
		return;
	}
	const lila = new lichess();
	lila.setToken(req.query.token as string);
	await lila.teams.join('oxford-university-chess-club');
	res.status(204);
}

export default handler;