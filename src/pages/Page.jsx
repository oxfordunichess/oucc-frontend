import React from 'react';
import Markdown from 'react-markdown';
import {Helmet} from 'react-helmet';
import url from 'url';

import htmlParser from 'react-markdown/plugins/html-parser';
import HtmlToReact from 'html-to-react';
import Profile from '../components/Profile.tsx';
import Table from '../components/Table.tsx';
import Calendar from '../components/Calendar.tsx';
import {RouterLink} from '../utils/components';
import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

const styles = require('../css/page.module.css');

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

export default class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: '',
			wide: false
		};
		axios.defaults.params = {sessionID: this.props.sessionID};
	}

	get parseHtml() {
		return htmlParser({
			isValidNode: node => node.type !== 'script',
			processingInstructions: [
				{
					// Custom <Table> processing
					shouldProcessNode: (node) => {
						return node.name === 'data-table';
					},
					processNode: (node, children) => {
						return <Table {...node.attribs}/>;
					}
				},
				{
					// Custom <Calendar> processing
					shouldProcessNode:(node) => {
						return node.name === 'calendar';
					},
					processNode: (node, children) => {
						if (!this.state.wide) this.setState({ wide: true });
						return <Calendar {...node.attribs} sessionID={this.props.sessionID}/>;
					}
				},
				{
					// Custom <Profile> processing
					shouldProcessNode:(node) => {
						return node.name === 'profile';
					},
					processNode: (node, children) => {
						return <Profile {...node.attribs}/>;
					}
				},
				{
					// Anything else
					shouldProcessNode: function () {
						return true;
					},
					processNode: processNodeDefinitions.processDefaultNode
				}
			]
		});
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
		let sections = this.state.page.trim().split('\n---\n');
		return (
			<>
				<Helmet>
					<title>{this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}</title>
				</Helmet>
				<div className={styles.page}>
					{sections.map((section, i) => {
						return <div className={styles.main} key={['section', i].join('.')} style={{
							width: this.state.wide ? '100%' : '61.8%'
						}}>
							<Markdown
								source={section.trim()}
								escapeHtml={false}
								astPlugins={[this.parseHtml]}
								renderers={{
									link: RouterLink
								}}
								transformImageUri={(uri) => {
									if (uri.startsWith('.') || uri.startsWith('/')) uri = url.resolve('https://oxfordunichess.github.io/oucc-backend/data/', uri);
									return uri;
								}}
							/>
						</div>;
					})}				
				</div>
			</>
		);
	}
}