import React from 'react';
import Markdown from 'react-markdown';
import Title from 'react-document-title';

import Header from '../common/header';
import Sidebar from '../common/sidebar';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: ''
		}
	}

	static async getPage(path = 'main') {
		try {
			let url = `pages/${path + '.md'}?token=${Math.random().toString(36).slice(2)}`;
			let req = await axios(url);
			return req.data;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	async componentDidMount() {
		let page = await this.constructor.getPage(this.props.page);
		this.setState({page});
	}

	render() {
		return (
			<>
				<Title title={this.props.title ? this.props.title + ' | OUCC' : 'OUCC'} />
				<Header/>
				<div id="page">
					<Sidebar/>
					<div id="main">
						{this.state.page ? <Markdown source={this.state.page.trim()}/> : null}
					</div>
				</div>
			</>
		)
	}
}