import React, { ReactElement } from 'react';
import Markdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import url from 'url';

import { Article } from '../interfaces';
import { RouterLink } from '../utils/components';
import { parseHtml } from '../utils/plugins';
import regexes from '../utils/regexes';

const styles = require('../css/page.module.css');

export default class News extends React.Component<{
	title: string
	articles: string[]
	sessionID: string
}, {
	mounted: boolean
	wide: boolean
}> {
	
	public state = {
		mounted: false,
		wide: false
	}

	static setSection(location: Location, id: string): string {
		return location.href.slice(0, -location.hash.length) + '#' + id;
	}

	componentDidUpdate(): void {
		if (this.state.mounted) return;
		if (this.props.articles.length) {
			if (window.location.hash) {
				window.location = window.location.toString().slice(0) as unknown as Location;
				this.setState({mounted: true});
			}
		}
	}

	render(): ReactElement {
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
			let intro = `## [${header}](${News.setSection(window.location, id)})`;
			let joined = [intro, ...lines].join('\n');
			articles.set(id, {
				title: header + ' | OUCC',
				image: (joined.match(regexes.image) || [])[1],
				description: lines.find(line => line.trim() && !line.trim().startsWith('#'))
			});
			return (
				<div				
					id={id}
					key={id}
					className={[
						styles.section,
						this.state.wide ? styles.wide : ''
					].join(' ')}
				>
					<Markdown
						source={joined}
						escapeHtml={false}
						astPlugins={[parseHtml(this.props.sessionID)]}
						renderers={{
							link: RouterLink
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
		let data = {} as Article;
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
				<div className={styles.page} >
					<div className={styles.main} style={{
						width: this.state.wide ? '100%' : '61.8%'
					}}>{components}</div>
				</div>
			</>
		);
	}
}