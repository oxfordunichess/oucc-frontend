import React from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import {Helmet} from 'react-helmet';

import Header from '../common/header';
import Sidebar from '../common/sidebar';

import htmlParser from 'react-markdown/plugins/html-parser';
import HtmlToReact from 'html-to-react';
import Table from './Table';

import styles from '../css/page.module.css';

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const  processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const parseHtml = htmlParser({
	isValidNode: node => node.type !== 'script',
	processingInstructions: [
		{
			// Custom <Table> processing
			shouldProcessNode: function (node) {
				if (!node.name) return false;
				if (node.name === 'data-table') return true;
				return false;
			},
			processNode: function (node, children) {
				switch (node.name) {
					case ('data-table'):
						return <Table {...node.attribs}/>;
					default:
						return null;
				}
			}
		},
		{
			// Anything else
			shouldProcessNode: function (node) {
				return true;
			},
			processNode: processNodeDefinitions.processDefaultNode
		}
	]
})

const regexes = {
	date: /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}_/,
	letters: /\w+/g,
	image: /<img\s+.*?src=["'](.*).*?">/
}

export default class Feed extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			articles: []
		}
	}

	static async getIndex() {
		try {
			return await axios({
				url: 'https://api.github.com/repos/oxfordunichess/oucc-backend/contents/news/',
				method: 'get',
				maxRedirects: 5
			})
		} catch (e) {
			if (e) console.error(e);
			return [];
		}

	}

	static isDev() {		
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			return true;
		} else {
			return false;
		}
	}

	static async getArticle(pathname) {
		try {
			return await axios({
				baseURL: 'https://oxfordunichess.github.io/oucc-backend/news/',
				url: pathname + (Feed.isDev() ? '?token=' + Math.random().toString(36).slice(2) : ''),
				method: 'GET',
				maxRedirects: 5
			}).then(v => v.data);
		} catch (e) {
			if (e) console.error(e);
			return '';
		}
	}

	static setSection(location, id) {
		return location.href.slice(0, -location.hash.length) + '#' + id;
	}

	async componentDidMount() {
		let {data} = await Feed.getIndex();
		let filenames = data.map(file => file.name);
		let real = filenames.filter(name => name.endsWith('.md') && regexes.date.test(name));
		let sorted = real.sort((a, b) => {
			let a_date = new Date(a.split('_')[0]);
			let b_date = new Date(b.split('_')[0]);
			// eslint-disable-next-line no-self-compare
			if (a_date.getTime() !== a_date.getTime()) return 1;
			// eslint-disable-next-line no-self-compare
			if (b_date.getTime() !== b_date.getTime()) return -1;
			return b_date - a_date;
		});
		let articles = new Array(sorted.length);
		this.setState({articles})
		sorted.map((names, i) => Feed.getArticle(names)
			.then(data => articles[i] = data)
			.then(() => this.setState({articles}))
			.catch(console.error)
		)
	}

	render() {
		let articles = new Map();
		let components = this.state.articles.map((text) => {
			let lines = text.split('\n');
			let header = lines.shift().trim();
			while (header.startsWith('#')) {
				header = header.slice(1);
			}
			header = header.trim();
			let id = header.match(regexes.letters).join('-').toLowerCase();
			let intro = `## [${header}](${Feed.setSection(window.location, id)})`;
			let joined = [intro, ...lines].join('\n');
			articles.set(id, {
				title: header + ' | OUCC',
				image: (joined.match(regexes.image) || [])[1],
				description: lines.find(line => line.trim() && !line.trim().startsWith('#'))
			});
			return (
				<div id={id} key={id} className={styles.article}>
					<Markdown
						source={joined}
						escapeHtml={false}
						astPlugins={[parseHtml]}
					/>
					<hr />
				</div>
			)
		});
		let data = {};
		if (window.location.hash && articles.get(window.location.hash.slice(1))) {
			data = articles.get(window.location.hash.slice(1));
		}
		return (
			<>
				<Helmet defaultTitle={this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}>
					<title>{data.title}</title>
    				<meta property='og:type' content='article' />
    				{data.description ? <meta name='description' content={data.description} /> : null}
					{data.image ? <meta property='og:image' content={data.image} /> : null}
				</Helmet>
				<Header parent={this.props.parent} />
				<div className={styles.page}>
					<Sidebar />
					<div className={styles.main}>{components}</div>
				</div>
			</>
		)
	}
}