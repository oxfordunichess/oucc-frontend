import React, { useContext, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import cx from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Link } from 'utils/link';
import axios, { server } from 'utils/axios';
import { parseHtml } from 'utils/plugins';
import { MobileContext } from 'utils/contexts';
import { CalendarGivenProps, IndexData } from 'components/interfaces';
import { getNews } from './api/articles';
import { getNavigation } from './api/navigation';
import { useRouter } from 'next/router';

const styles = require('../css/page.module.css');

interface PageProps {
	title?: string
	description?: string
	redirect?: string
	page: string
}

export default function Page(props: PageProps) {

	const router = useRouter();
	const wide = useMemo(() => {
		return props.page?.toLowerCase().includes('<calendar');
	}, [props.page]);

	const sections = props.page?.trim().split('\n---\n') || [];

	useEffect(() => {
		if (!props.redirect) return;
		router.push(props.redirect);
	}, [props.redirect, router]);

	return <>
		<div className={styles.page}>
			<div className={styles.main}>
				{sections.map((section, i) => {
					let src = section.trim();
					return <div
						key={['section', i].join('.')}
						className={cx(styles.section, {
							[styles.wide]: wide
						})}
					>
						<Markdown
							source={src}
							escapeHtml={false}
							astPlugins={[parseHtml()]}
							renderers={{
								link: Link
							}}
							transformImageUri={(uri) => {
								if (uri.startsWith('.') || uri.startsWith('/')) uri = new URL('data/' + uri, server).href;
								return uri;
							}}
						/>
						<script type='text/markdown'>
							{src}
						</script>
					</div>;
				})}
			</div>
		</div>
	</>;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

	const data = await axios({ url: '/index.json' })
		.then(res => res.data) as IndexData;
	const paths = Object.entries(data).map(([k, v]) => {
		if (k === 'index.html') return null;
		let index = v.private ?
			['private', ...k.split('/')] :
			k.split('/');
		return {
			params: { index }
		};
	}).filter(v => v);
	
	return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	
	const data = await axios({ url: '/index.json' })
		.then(res => res.data)
		.catch(console.error) as IndexData;
	let index = ctx.params!.index;
	let indexArr = typeof index === 'string' ?
		index = [index] :
		index || ['main'];
	let k = indexArr.join('/');

	if (!data) return {
		notFound: true
	};
	let v = data[k];

	if (!v) return {
		notFound: true
	};

	if (v.redirect) {
		return {
			props: {
				redirect: v.redirect
			}
		};
	}

	let file = v.file || k;
	let page: string = await axios({ url: `/pages/${file}.md` })
		.then(r => r.data)
		.catch(console.error);
	if (!page) return {
		notFound: true
	};

	let calendar = null as CalendarGivenProps;
	if (page.includes('<Calendar')) {
		calendar = await axios({ url: '/calendar.json' })
			.then(r => r.data)
			.catch(console.error);
		if (!calendar) return {
			notFound: true
		}
	}

	const articles = await getNews();
	const navigation = await getNavigation();
	
	return {
		props: {
			page,
			articles,
			navigation,
			title: v.title,
			description: v.description || '',
			metaData: v,
			calendar
		},
		revalidate: 1
	};
};