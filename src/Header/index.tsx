import React, { ReactElement } from 'react';

import Banner from './banner';
import Runner from './runner';

//[link, name, wide, display]
import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

const styles = require('../css/header.module.css');

export default class Header extends React.Component<{
	articles: string[]
}> {

	render(): ReactElement {
		return (
			<div className={styles.header}>
				<Banner/>
				<Runner articles={this.props.articles}/>
			</div>
		);
	}

}