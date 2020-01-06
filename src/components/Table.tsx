import React, { ReactElement } from 'react';
import Papa from 'papaparse';
import { TableJSON } from '../pages/interfaces';
import { GithubCommit } from '../interfaces';

import { capitalise } from '../utils/prototype';

import axios from 'axios';

export default class Table extends React.Component<{
	src: string,
	sessionID: string
}, {
	table: ReactElement,
	date: Date | null
}> {

	public state = {
		table: null as ReactElement,
		date: null as Date | null
	}

	static getData(file: string, sessionID: string): any {
		return axios({
			baseURL: 'https://oxfordunichess.github.io/oucc-backend/',
			url: file,
			params: {sessionID}
		})
			.then(res => res.data)
			.catch((e) => {
				console.error(e);
				return [null];
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

	static getDate(file: string): any {
		return axios({
			baseURL: 'https://api.github.com/repos/oxfordunichess/oucc-backend/',
			url: 'commits',
			params: {
				path: file,
				page: 1,
				per_page: 1
			}
		})
			.then(res => res.data)
			.catch((e) => {
				console.error(e);
				return [null];
			});
	}

	async componentDidMount(): Promise<void[]> {
		if (!this.props.src) return;
		return Promise.all([
			Table.getData('data/' + this.props.src, this.props.sessionID)
				.then((data: any) => {
					if (this.props.src.endsWith('.csv')) {
						let res = Papa.parse(data as string, {
							header: true,
							dynamicTyping: true,
							skipEmptyLines: 'greedy'
						});
						data = res.data.map((obj) => {
							for (let k of Object.keys(obj)) {
								if (!k) delete obj[k];
							}
							return obj;
						});
					}
					return data;
				})
				.then((data: TableJSON[]) => {
					return Table.generateTablefromJSON(data);
				})
				.then((table: ReactElement) => {
					this.setState({table});
				})
				.catch(console.error),
			Table.getDate('data/' + this.props.src)
				.then((data: GithubCommit[]) => {
					if (data[0]) return new Date(data.shift().commit.committer.date);
					else return new Date();
				})
				.then((date: Date) => {
					this.setState({date});
				})
				.catch(console.error)
		]);
	}

	render(): ReactElement {
		return (
			<>				
				<div style={{
					textAlign: 'right'
				}}>
					{this.state.date ? 'Last updated: ' + this.state.date.toString().slice(0, 24) : ''}
				</div>
				{this.state.table}
			</>
		);
	}
}