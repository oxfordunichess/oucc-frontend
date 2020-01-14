import React from 'react';
import Markdown from 'react-markdown';
import {Helmet} from 'react-helmet';
import url from 'url';

import {RouterLink} from '../utils/components';
import axios, { server } from '../utils/axios';
import { parseHtml } from '../utils/plugins';
import { SessionContext } from '../utils/contexts';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

const styles = require('../css/page.module.css');

interface PageProps extends RouteComponentProps<any, StaticContext, any> {
	title?: string
	description?: string
	page: string
}

export default class Page extends React.Component<PageProps, {
	page: string,
	wide: boolean
}> {

	static contextType = SessionContext;
	public context: React.ContextType<typeof SessionContext>;

	public state = {
		page: '',
		wide: false
	}

	static async getPage(path: string = 'main', sessionID?: string) {
		try {
			let url = `pages/${path + '.md'}`;
			let req = await axios({
				url,
				params: { sessionID }
			});
			return req.data;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	public setWide = () => {
		if (!this.state.wide) this.setState({
			wide: true
		});
	}

	componentDidMount() {
		Page.getPage(this.props.page, this.context)
			.then((page: string) => {
				this.setState({page});
			});
	}

	render() {
		let sections = this.state.page.trim().split('\n---\n');
		let title = this.props.title ? this.props.title + ' | OUCC' : 'OUCC';
		document.title = title;
		let description = document.querySelector('meta[name="description"]');
		if (this.props.description) description.setAttribute('content', this.props.description);
		return (
			<>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<div className={styles.page}>
					<div className={styles.main}>
						{sections.map((section, i) => {
							return <div
								key={['section', i].join('.')}
								className={[
									styles.section,
									this.state.wide ? styles.wide : ''
								].join(' ')}
							>
								<Markdown
									source={section.trim()}
									escapeHtml={false}
									astPlugins={[parseHtml(this.props, this.context, this.setWide)]}
									renderers={{
										link: RouterLink
									}}
									transformImageUri={(uri) => {
										if (uri.startsWith('.') || uri.startsWith('/')) uri = url.resolve(server + 'data/', uri);
										return uri;
									}}
								/>
							</div>;
						})}		
					</div>
				</div>
			</>
		);
	}
}