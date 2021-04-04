import React, { useContext, useMemo } from 'react';
import Markdown from 'react-markdown';
import url from 'url';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Link } from 'utils/link';
import axios, { server } from 'utils/axios';
import { parseHtml } from 'utils/plugins';
import { MobileContext } from 'utils/contexts';
import { IndexData } from 'components/interfaces';
import { getNews } from './api/articles';
import { getNavigation } from './api/navigation';

const styles = require('../css/page.module.css');

interface PageProps extends RouteComponentProps<any, StaticContext, any> {
	title?: string
	description?: string
	page: string
}

export default function Page(props: PageProps) {

	const wide = useMemo(() => {
		return props.page?.toLowerCase().includes('<calendar');
	}, [props.page]);

	const sections = props.page?.trim().split('\n---\n') || [];

	const isMobile = useContext(MobileContext);

	return (
		<div className={[styles.page, isMobile ? styles.mobilePage : ''].join(' ')}>
			<div className={[styles.main, isMobile ? styles.mobileMain : ''].join(' ')}>
				{sections.map((section, i) => {
					return <div
						key={['section', i].join('.')}
						className={[
							styles.section,
							wide ? styles.wide : '',
							isMobile ? styles.mobileSection : ''
						].join(' ')}
					>
						<Markdown
							source={section.trim()}
							escapeHtml={false}
							astPlugins={[parseHtml()]}
							renderers={{
								link: Link
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
	);
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

	const data = await axios({ url: '/index.json' })
		.then(res => res.data) as IndexData;
	const paths = Object.entries(data).map(([k, v]) => {
		let index = v.private ?
			['private', ...k.split('/')] :
			k.split('/');
		return {
			params: { index }
		};
	});
	return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const data = await axios({ url: '/index.json' })
		.then(res => res.data) as IndexData;
	let index = ctx.params!.index;
	let indexArr = typeof index === 'string' ?
		index = [index] :
		index || ['main'];
	let k = indexArr.join('/');
	let v = data[k];
	if (!v) return {
		notFound: true
	};

	if (v.redirect) {
		return {
			redirect: v.redirect,
			props: {
				index: []
			}
		};
	}

	let file = v.file || k;
	let page = await axios({ url: `/pages/${file}.md` }).then(r => r.data);
	if (!page) return {
		notFound: true
	};

	const articles = await getNews();
	const navigation = await getNavigation();
	
	return {
		props: {
			page,
			articles,
			navigation,
			title: v.title,
			description: v.description,
			metaData: v
		},
		revalidate: 1
	};
};