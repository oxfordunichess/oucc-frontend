import React from 'react';
import Papa from 'papaparse';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			table: null
		}
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
					{keys.map(key => <th key={key} scope='column'>{capitalise(key)}</th>)}
				</thead>
				<tbody>
					{body.map(line => {
						let id = Object.values(line)[0] ? Object.values(line)[0].toLowerCase().replace(/\s+/g, '-') : null;
						return (
							<tr key={id} id={id} >{
								keys.map(key => <td>{key in line ? line[key] : null}</td>)
							}</tr>
						);
					})}
				</tbody>
			</table>
		)
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

function capitalise(str) {
	if (typeof str !== 'string') throw new TypeError();
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}