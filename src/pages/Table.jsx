import React from 'react';
import Papa from 'papaparse';

import {capitalise} from '../utils/prototype';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			table: null
		};
	}

	static async getData(file) {
		try {
			let data = await axios(file);
			let body = data.data;
			return body;
		} catch (e) {
			if (e) console.error(e);
			return [{}];
		}
	}

	static async generateTablefromJSON(body) {
		let keys = Object.keys(body[0]);
		return (
			<table>
				<thead>
					<tr>
						{keys.map((key, i) => <th key={[key, i].join('.')} scope='column'>{capitalise(key)}</th>)}
					</tr>
				</thead>
				<tbody>
					{body.map(line => {
						let id = Object.values(line)[0] ? Object.values(line)[0].toLowerCase().replace(/\s+/g, '-') : null;
						return (
							<tr key={id} id={id} >{
								keys.map((key, i) => <td key={[key, i].join('.')}>{key in line ? line[key] : null}</td>)
							}</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	async componentDidMount() {
		if (!this.props.src) return;
		let data = await Table.getData('data/' + this.props.src);
		if (this.props.src.endsWith('.csv')) data = Papa.parse(data, {
			header: true,
			dynamicTyping: true
		}).data;
		let table = await Table.generateTablefromJSON(data);
		this.setState({table});
	}

	render() {
		return this.state.table;
	}
}