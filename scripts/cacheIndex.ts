import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { IndexData } from '../src/interfaces';

axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

function getIndex(): Promise<IndexData> {
	return axios({
		url: 'index.json',
		params: {
			sessionID: Math.random().toString(16).slice(2)
		},
	})
		.then(res => res.data)
		.catch((e) => {
			console.error(e);
			return {};
		});
}

getIndex()
	.then(index => fs.writeFileSync(
		path.join('src', 'assets', 'index.json'),
		JSON.stringify(index, null, 4)
	));