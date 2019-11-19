import React from 'react';
import {Link} from 'react-router-dom';

import Banner from './banner'
import Runner from './runner';

import styles from '../css/header.module.css';
import {isDev} from '../utils/auth';

//[link, name, wide, display]
import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

const regexes = {
	space: /\s+/g,
	letters: /\w+/g
}

const fps = 60;

export default class Header extends React.Component {

	render() {
		return (
			<div className={styles.header}>
				<Banner/>
				<Runner {...this.props}/>
			</div>
		)
	}

}