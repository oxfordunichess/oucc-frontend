import React, {ReactElement} from 'react';
import Papa from 'papaparse';
import {TableProps, TableJSON} from './interfaces';

import {capitalise} from '../utils/prototype';

import axios from 'axios';
axios.defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Table extends React.Component<{
	src: string
}, {
	table: ReactElement
}> {

	constructor(props: TableProps) {
		super(props);
		this.state = {
			table: null
		};
	}

	static getData(file: string): any {
		return axios(file)
			.then(res => res.data)
			.catch((e) => {
				console.error(e);
				return [{}]
			});
	}

	static async generateTablefromJSON(body: TableJSON[]): Promise<ReactElement> {
		let keys = Object.keys(body[0]);
		return (
			<table>
				<thead>
					<tr>
						{keys.map((key, i) => <th key={[key, i].join('.')} scope='column'>{capitalise(key)}</th>)}
					</tr>
				</thead>
				<tbody>
					{body.map((line) => {
						let id = Object.values(line)[0] ? Object.values(line)[0].toString().toLowerCase().replace(/\s+/g, '-') : null;
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

	async componentDidMount(): Promise<void> {
		if (!this.props.src) return;
		let data = await Table.getData('data/' + this.props.src);
		if (this.props.src.endsWith('.csv')) data = Papa.parse(data as string, {
			header: true,
			dynamicTyping: true
		}).data;
		let table = await Table.generateTablefromJSON(data as TableJSON[]);
		this.setState({table});
	}

	render(): ReactElement {
		return this.state.table;
	}
}