import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import MobileHeader from './Header/mobile';
import Header from './Header/index';

import Contexts, { CalendarContext, MobileContext } from 'utils/contexts';
import { updateMobile } from 'utils/auth';
import Footer from './Footer';
import { NavigationData } from './Header/interfaces';

interface AppProps {
	title?: string
	description?: string
	articles: string[]
	navigation: NavigationData
	calendar?: null | Calendar
	children: ReactNode
}

export default function App(props: AppProps) {

	const router = useRouter();

	const [isMobile, setMobile] = useState(false);
	useEffect(() => {
		setMobile(updateMobile());
	}, [setMobile]);

	const showHeader = useMemo(() => {
		if (router.pathname.endsWith('.json')) return false;
		if (router.pathname === '/version') return false;
		return true;
	}, [router]);

	return <>
		<Head>
			<title>{props.title}</title>
			<meta name="description" content={props.description} />
		</Head>
		<Contexts values={[
			[MobileContext, isMobile],
			[CalendarContext, props.calendar]
		]}>
			{showHeader ?
				isMobile ?
					<MobileHeader /> :
					<Header articles={props.articles || []} navigation={props.navigation || {}} /> :
				null
			}
			<div id='main'>
				{props.children}
				<Footer />
			</div>
		</Contexts>
	</>;
}