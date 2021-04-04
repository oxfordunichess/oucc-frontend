import React, { ReactElement, useContext, useMemo } from 'react';
import Markdown from 'react-markdown';
import cx from 'classnames';

import Head from 'next/head';

import { Link } from 'utils/link';
import { parseHtml } from 'utils/plugins';
import * as regexes from 'utils/regexes';
import axios, { server } from 'utils/axios';

const styles = require('css/page.module.css');
import { updateHash } from 'utils/prototype';
import { MobileContext } from 'utils/contexts';
import { GetStaticProps } from 'next';
import { getNews } from './api/articles';
import { getNavigation } from './api/navigation';

interface NewsProps {
	articles: string[]
};

export default function News(props: NewsProps) {

	const isMobile = useContext(MobileContext);

	const [articles, components] = useMemo(() => {
		let dict = new Map();
		let arr = (props.articles || []).map((text) => {
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
			let intro = `## [${header}](#${id})`;
			let joined = [intro, ...lines].join('\n');
			dict.set(id, {
				title: header + ' | OUCC',
				image: (joined.match(regexes.image) || [])[1],
				description: lines.find(line => line.trim() && !line.trim().startsWith('#'))
			});
			return (
				<div				
					id={id}
					key={id}
					className={cx(styles.section, {
						[styles.mobileSection]: isMobile
					})}
				>
					<Markdown
						source={joined}
						escapeHtml={false}
						astPlugins={[parseHtml()]}
						renderers={{
							link: Link
						}}
						transformImageUri={(uri) => {
							if (uri.startsWith('.') || uri.startsWith('/')) uri = new URL(uri, server + 'data/').href;
							return uri;
						}}
					/>
					<hr />
				</div>
			);
		});
		return [dict, arr];
	}, [isMobile, props.articles]);

	const data = useMemo(() => {
		if (typeof window === 'undefined') return {};
		if (!window.location.hash) return {};
		let id = window.location.hash.slice(1);
		if (articles.get(id)) return articles.get(id);
	}, [articles]);

	return <>
		<Head>
			<title>{data.title}</title>
			<meta property='og:type' content='article' />
			{data.description ? <meta name='description' content={data.description} /> : null}
			{data.image ? <meta property='og:image' content={data.image} /> : null}
		</Head>
		<div className={[styles.page, isMobile ? styles.mobilePage : ''].join(' ')}>
			<div className={[styles.main, isMobile ? styles.mobileMain : ''].join(' ')}>
				{components}
			</div>
		</div>
	</>;
		
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const articles = await getNews();
	const navigation = await getNavigation();
	
	return {
		props: {
			articles,
			navigation
		},
		revalidate: 1
	};
};