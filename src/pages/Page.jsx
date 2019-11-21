import React from 'react';
import Markdown from 'react-markdown';
import {Helmet} from 'react-helmet';
import path from 'path';

import htmlParser from 'react-markdown/plugins/html-parser';
import HtmlToReact from 'html-to-react';
import Table from './Table.tsx';

import {isDev} from '../utils/auth.ts';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const parseHtml = htmlParser({
	isValidNode: node => node.type !== 'script',
	processingInstructions: [
		{
			// Custom <Table> processing
			shouldProcessNode: function (node) {
				return node.name && node.name === 'data-table';
			},
			processNode: function (node, children) {
				return <Table {...node.attribs}/>;
			}
		},
		{
			// Anything else
			shouldProcessNode: function (node) {
				return true;
			},
			processNode: processNodeDefinitions.processDefaultNode
		}
	]
});

export default class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: ''
		};
	}

	static async getPage(path = 'main') {
		try {
			let url = `pages/${path + '.md'}${isDev() ? '?token=' + Math.random().toString(36).slice(2) : ''}`;
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
				<Helmet>
					<title>{this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}</title>
				</Helmet>
				<div id="page">
					<div id="main">
						{this.state.page ? <Markdown
							source={this.state.page.trim()}
							escapeHtml={false}
							astPlugins={[parseHtml]}
							transformLinkUri={(uri) => {
								uri = Markdown.uriTransformer(uri);
								if (uri.startsWith('/') || uri.startsWith('./')) uri = path.join(process.env.PUBLIC_URL, uri);
								return uri;
							}}
						/> : null}
					</div>
				</div>
			</>
		);
	}
}