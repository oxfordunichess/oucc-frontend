import React, { ReactElement } from 'react';
import Markdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import url from 'url';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import { Article } from '../interfaces';
import { RouterLink } from '../utils/components';
import { parseHtml } from '../utils/plugins';
import * as regexes from '../utils/regexes';
import { SessionContext } from '../utils/contexts';
import { server } from '../utils/axios';

const styles = require('../css/page.module.css');

interface NewsProps extends RouteComponentProps<any, StaticContext, any> {
	title: string
	articles: string[]
};

export default class News extends React.Component<NewsProps, {
	mounted: boolean
	wide: boolean
}> {

	static contextType = SessionContext;
	public context: React.ContextType<typeof SessionContext>;
	
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
						astPlugins={[parseHtml(this.props, this.context)]}
						renderers={{
							link: RouterLink
						}}
						transformImageUri={(uri) => {
							if (uri.startsWith('.') || uri.startsWith('/')) uri = url.resolve(server + 'data/', uri);
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
					<div className={styles.main}>{components}</div>
				</div>
			</>
		);
	}
}