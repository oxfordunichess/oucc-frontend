import React, { ReactElement, useState, useCallback, useEffect } from 'react';
import Papa from 'papaparse';
import { TableJSON } from './interfaces';
import { GithubCommit } from './github.interfaces';

import { capitalise } from '../utils/prototype';

import axios from '../utils/axios';

export default function Table(props: {
	src: string
}) {

	const [body, setBody] = useState([] as TableJSON[]);
	const [date, setDate] = useState(null as Date | null);

	const getData = useCallback(async (file: string): Promise<any> => {
		let res = await axios({ url: file });
		let data = res.data;
		if (props.src.endsWith('.csv')) {
			let csv = Papa.parse(data as string, {
				header: true,
				dynamicTyping: true,
				skipEmptyLines: 'greedy'
			});
			data = csv.data.map((obj) => {
				for (let k of Object.keys(obj)) {
					if (!k) delete obj[k];
				}
				return obj;
			});
		}
		setBody(data);
	}, [setBody]);

	const getDate = useCallback((file: string) => {
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
			.then((data: GithubCommit[]) => {
				if (data[0]) return new Date(data.shift().commit.committer.date);
				else return new Date();
			})
			.then(setDate)
			.catch((e) => {
				console.error(e);
			});
	}, [setDate]);

	const GenerateTable = useCallback(function GenerateTable({ arr }: { arr: TableJSON[] }) {
		if (!arr.length) return null;
		let keys = Object.keys(arr[0]);
		return (
			<table>
				<thead>
					<tr>
						{keys.map((key, i) => <th key={[key, i].join('.')} scope='column'>{capitalise(key)}</th>)}
					</tr>
				</thead>
				<tbody>
					{arr.map((line) => {
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
	}, []);

	const updateData = useCallback(async () => {
		try {
			let data = await getData('data/' + props.src)
			if (props.src.endsWith('.csv')) {
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
			setBody(data);
		} catch (e) {
			console.error(e);
		}
	}, [props.src]);

	useEffect(() => {
		updateData();
	}, [updateData]);

	useEffect(() => {
		getDate('data/' + props.src);
	}, [getDate, props.src]);

	return (
		<>				
			<div style={{ textAlign: 'right' }}>
				{date ? 'Last updated: ' + date.toString().slice(0, 24) : ''}
			</div>
			<GenerateTable arr={body} />
		</>
	);
		
}