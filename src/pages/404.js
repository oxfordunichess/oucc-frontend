import React from 'react';
import Head from 'next/head';

import { Link } from 'utils/link';
import Footer from 'components/Footer';

export default function NotFound() {
	
	return (
		<>				
			<Head>
				<title>OUCC</title>
			</Head>
			<div id='main'>
				<h1>404: Not found</h1>
				<h3><Link href='/'>Return to home</Link></h3>
			</div>				
			<Footer />	
		</>
	);
		
}