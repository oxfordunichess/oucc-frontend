import React, { ReactElement } from 'react';

import Banner from './banner';
import { NavigationData } from './interfaces';
import Runner from './runner';

const styles = require('../../css/header.module.css');

export default function Header(props: {
	articles: string[]
	navigation: NavigationData
}) {

	return (
		<div className={styles.header}>
			<Banner navigation={props.navigation} />
			<Runner articles={props.articles} />
		</div>
	);

}