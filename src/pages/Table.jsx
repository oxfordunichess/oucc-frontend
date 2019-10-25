import React from 'react';
import Title from 'react-document-title';

import Header from '../common/header';
import Sidebar from '../common/sidebar';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			table: null
		}
	}

	static async generateTable(subtitle, file) {
		console.log(subtitle, file);
		let data = await axios(file);
		let body = data.data;
		let keys = Object.keys(body[0]);
		return (
			<>
				<h2 id={subtitle + '-sub'}>{subtitle}</h2>
				<table>
					<thead>
						{keys.map(key => <th key={key} scope='column'>{key}</th>)}
					</thead>
					<tbody>
						{body.map(line => <tr>{
							keys.map(key => <td>{key in line ? line[key] : null}</td>)
						}</tr>)}
					</tbody>
				</table>
			</>
		)
	}

	async componentDidMount() {
		if (!this.props.file) return;
		let table = await Table.generateTable(this.props.subtitle || capitalise(this.props.file), 'data/' + this.props.file + '.json');
		this.setState({table});
	}

	render() {
		return (
			<>
				<Title title={this.props.title ? this.props.title + ' | OUCC' : 'OUCC'} />
				<Header parent={this.props.parent} />
				<div id="page">
					<Sidebar />
					<div id="main">
					<h1>{this.props.subtitle || capitalise(this.props.file)}</h1>
					<br/>
					{this.state.table}
					</div>
				</div>
			</>
		)
	}
}
		
function capitalise(str) {
	if (typeof str !== 'string') throw new TypeError();
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}
