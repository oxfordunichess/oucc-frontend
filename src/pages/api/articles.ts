import { GithubFile } from 'components/github.interfaces';
import { NextApiHandler } from 'next';
import axios from 'utils/axios';
import * as regexes from 'utils/regexes';

const handler: NextApiHandler = async (req, res) => {
	getNews().then(data => res.status(200).json(data));
}

export function getNews(): Promise<string[]> {
	return axios({
		baseURL: 'https://api.github.com/repos/oxfordunichess/oucc-backend/',
		url: 'contents/news/',
		method: 'get',
		maxRedirects: 5
	})
		.then(r => r.data)
		.then(fetchArticles)
}

export default handler;

async function fetchArticles(data: GithubFile[]): Promise<string[]> {		
	let filenames = (data || []).map(file => file.name);
	let real = filenames.filter(name => name.endsWith('.md') && regexes.date.test(name));
	let sorted = real.sort((a, b) => {
		let a_date = new Date(a.split('_')[0]);
		let b_date = new Date(b.split('_')[0]);
		// eslint-disable-next-line no-self-compare
		if (a_date.getTime() !== a_date.getTime()) return 1;
		// eslint-disable-next-line no-self-compare
		if (b_date.getTime() !== b_date.getTime()) return -1;
		return b_date.getTime() - a_date.getTime();
	});
	let articles = new Array(sorted.length);
	sorted.forEach((names, i) => articles[i] = getArticle(names)
		.catch(console.error)
	);
	return await Promise.all(articles);
}

async function getArticle(pathname: string): Promise<string> {
	return axios({
		url: 'news/' + pathname,
		method: 'GET',
		maxRedirects: 5
	})
		.then(v => v.data);
}
