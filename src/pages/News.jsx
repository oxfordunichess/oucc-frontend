import React from 'react';
import Markdown from 'react-markdown';
import {Helmet} from 'react-helmet';
import url from 'url';

import htmlParser from 'react-markdown/plugins/html-parser';
import HtmlToReact from 'html-to-react';
import Table from './Table.tsx';
import regexes from '../utils/regexes';
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
});

export default class Feed extends React.Component {

	static setSection(location, id) {
		return location.href.slice(0, -location.hash.length) + '#' + id;
	}

	render() {
		let articles = new Map();
		let components = this.props.articles.map((text) => {
			if (typeof text !== 'string') return null;
			if (!text) {
				console.error('Bad Markdown document:\n' + text);
				return null;
			}
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
						transformLinkUri={(uri) => {
							uri = Markdown.uriTransformer(uri);
							if (uri.startsWith('/') || uri.startsWith('./')) uri = url.resolve(process.env.PUBLIC_URL, uri);
							return uri;
						}}
						transformImageUri={(uri) => {
							if (uri.startsWith('.') || uri.startsWith('/')) uri = url.resolve('https://oxfordunichess.github.io/oucc-backend/data/', uri);
							return uri;
						}}
					/>
					<hr />
				</div>
			);
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
				<div className={styles.page}>
					<div className={styles.main}>{components}</div>
				</div>
			</>
		);
	}
}