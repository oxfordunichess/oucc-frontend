import React from 'react';
import Markdown from 'react-markdown';
import {Helmet} from 'react-helmet';

import htmlParser from 'react-markdown/plugins/html-parser';
import HtmlToReact from 'html-to-react';
import Table from './Table.tsx';
import Calendar from './Calendar.tsx';
import {RouterLink} from '../utils/components';
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
				if (!node.name) return false;
				if (node.name === 'data-table') return true;
				if (node.name === 'calendar') return true;
				return false;
			},
			processNode: function (node, children) {
				switch (node.name) {
					case ('data-table'):
						return <Table {...node.attribs}/>;
					case ('calendar'):
						return <Calendar {...node.attribs}/>;
					default:
						return null;
				}
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
		axios.defaults.params = {sessionID: this.props.sessionID};
	}

	static async getPage(path = 'main', sessionID) {
		try {
			let url = `pages/${path + '.md'}`;
			let req = await axios({
				url,
				params: {sessionID}
			});
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
							renderers={{
								link: RouterLink
							}}
						/> : null}
					</div>
				</div>
			</>
		);
	}
}