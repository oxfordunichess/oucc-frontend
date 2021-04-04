import axios from 'axios';

const allowDev = false;

export const devServer = 'http://localhost:8081/';

export const prodServer = 'https://oxfordunichess.github.io/oucc-backend/';

export const server = process.env.NODE_ENV === 'development' && allowDev ? devServer : prodServer;

axios.defaults.baseURL = server;

const sessionID = Math.random().toString(16).slice(2, 18);

// alter all requests to use cookies only from AsyncStorageCookieStore
axios.interceptors.request.use(async (c) => {

	// the device will have it's own cookie store, and attempt to
	// send cookies itself.
	// this has been documented to be unreliable, so we wipe these cookies
	// and implement the cookie store ourselves.
	//await AsyncStorage.clear()
	return Object.assign(c, {
		params: {
			...c.params,
			sessionID
		}
	});

});

export default axios;