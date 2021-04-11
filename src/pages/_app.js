import Head from 'next/head';
import React from 'react';
import App from 'components/App';

import '../index.d.ts';
// In next.js, we need to import all css files in _index.js
import 'css/index.css';
import 'css/App.css';

export default function MyApp({ Component, pageProps }) {
	
	// Component[]
	let Parents = Component.Parents || [];
	
	let parentProps = {
		...pageProps,
		children: undefined
	};

	return <>
		<Head>
			<link rel="icon" href="/favicon.ico" />
			<title>Oxford University Chess Club</title>
			<meta name="description" content="Official website for the Oxford University Chess Club" />
			<meta property="og:image" content="images/varsity.jpg" />
			<link rel="apple-touch-icon" href="logo192.png" />
		</Head>
		<App {...pageProps}>
			{Component.Parent ?
				<Component.Parent {...parentProps}>
					<Component {...pageProps} />
				</Component.Parent> :
				Parents.reduce((acc, P) => {
					return (
						<P {...parentProps}>
							{acc}
						</P>
					);
				}, <Component {...pageProps} />)
			}	
		</App>
	</>;
}