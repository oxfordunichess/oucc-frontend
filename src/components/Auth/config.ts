import { isDev } from '../../utils/auth';

export const lichess = {
	id: isDev() ? '5vJ1ikA0qNR21fk7' : 'LwK306sbKWFHIzlV',
	secret: isDev() ? process.env.LICHESS_SECRET_BETA : process.env.LICHESS_SECRET,
	redirectUri: (isDev() ? 'http://localhost:3000/' : 'http://users.ox.ac.uk/~chess/')  + 'callback/lichess',
	tokenHost: 'https://oauth.lichess.org',
	tokenPath: '/oauth',
	authorizePath: '/oauth/authorize'
};