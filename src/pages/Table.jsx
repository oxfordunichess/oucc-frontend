import React from 'react';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			table: null
		}
	}

	static async generateTable(file) {
		let data = await axios(file);
		let body = data.data;
		let keys = Object.keys(body[0]);
		return (
			<table>
				<thead>
					{keys.map(key => <th key={key} scope='column'>{capitalise(key)}</th>)}
				</thead>
				<tbody>
					{body.map(line => <tr>{
						keys.map(key => <td>{key in line ? line[key] : null}</td>)
					}</tr>)}
				</tbody>
			</table>
		)
	}

	async componentDidMount() {
		if (!this.props.src) return;
		let table = await Table.generateTable('data/' + this.props.src);
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