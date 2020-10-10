import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import Markdown from 'react-markdown';
import {Helmet} from 'react-helmet';
import url from 'url';

import {RouterLink} from '../utils/components';
import axios, { server } from '../utils/axios';
import { parseHtml } from '../utils/plugins';
import { SessionContext } from '../utils/contexts';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { isMobile } from '../utils/auth';
import Footer from '../components/Footer';

const styles = require('../css/page.module.css');

async function getPage(path: string = 'main', sessionID?: string) {
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

interface PageProps extends RouteComponentProps<any, StaticContext, any> {
	title?: string
	description?: string
	page: string
}

export default function Page(props: PageProps) {

	const [page, setPage] = useState('');
	const [wide, setWide] = useReducer((s: boolean, a: boolean) => a ?? true, false) as [boolean, (a?: boolean) => void];
	const session = useContext(SessionContext);

	useEffect(() => {
		if (!props.page) return;
		getPage(props.page, session)
			.then((p: string) => {
				if (!p) return;
				let wide = false;
				if (p.toLowerCase().includes('<calendar')) wide = true;
				setPage(p);
				setWide(wide);
			});
	}, [props.page, setPage, setWide]);

	const sections = page.trim().split('\n---\n');

	const title = props.title ? props.title + ' | OUCC' : 'OUCC';
	document.title = title;
	let description = document.querySelector('meta[name="description"]');
	if (props.description) description.setAttribute('content', props.description);

	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<div className={[styles.page, isMobile() ? styles.mobilePage : ''].join(' ')}>
				<div className={[styles.main, isMobile() ? styles.mobileMain : ''].join(' ')}>
					{sections.map((section, i) => {
						return <div
							key={['section', i].join('.')}
							className={[
								styles.section,
								wide ? styles.wide : '',
								isMobile() ? styles.mobileSection : ''
							].join(' ')}
						>
							<Markdown
								source={section.trim()}
								escapeHtml={false}
								astPlugins={[parseHtml(props, session, setWide)]}
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
					<Footer />	
				</div>
			</div>
		</>
	);
}