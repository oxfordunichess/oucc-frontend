import axios from 'utils/axios';

export function getNavigation(): Promise<string[]> {
	return axios({ url: '/navigation.json' })
		.then(r => r.data);
}