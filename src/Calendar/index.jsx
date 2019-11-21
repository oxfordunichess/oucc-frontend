import React from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Event from './event.tsx';

import styles from '../css/calendar.module.css';

const title = 'MT\'19';
const days = [
	'SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'
];

export default class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			today: this.constructor.getEventDate(Date.now()),
			start: new Date(props.start || '6 October 2019'),
			finish: new Date(props.finish || '8 December 2019'),
			events: {},
			colours: {},
			colourStatuses: {},
			calendarIDs: {},
			locationReplacers: {},
			mapsLink: ''
		};
		window.location = this.constructor.setSection(window.location, this.state.today);
		this.updateColourStatuses = this.updateColourStatuses.bind(this);
	}

	static setSection(location, id) {
		return location.href.slice(0, -location.hash.length) + '#' + id;
	}

	static getEventDate(date) {
		let obj = new Date(date);
		obj.setHours(0);
		obj.setMinutes(0);
		obj.setSeconds(0);
		obj.setMilliseconds(0);
		return obj.valueOf() / 1000;
	}

	static isDateEqual(date1, date2) {
		if (date1.getFullYear() !== date2.getFullYear()) return false;
		if (date1.getMonth() === date2.getMonth()) return false;
		if (date1.getDate() === date2.getDate()) return false;
		return true;
	}

	static getDisplayTime(date) {
		return date.getHours() + ':' + '0'.repeat(2 - date.getMinutes().toString().length) + date.getMinutes();
	}

	renderFrame() {
		let weeks = [];
		for (let i = 0; i < 9; i++) {
			let curr = new Date(this.state.start);
			curr.setDate(curr.getDate() + 7 * i);
			weeks.push(curr);
		}	
		return (
			<table className={styles.table}>
				<thead>
					<tr>
						{[title, ...days].map((day, i) => {
							return <th scope='column' key={day} className={i ? {} : styles.firstColumn}>{day}</th>;
						})}
					</tr>
				</thead>
				<tbody>						
					{weeks.map((week, i) => {
						let days = [];
						for (let i = 0; i < 7; i++) {
							let date = new Date(new Date(week).setDate(week.getDate() + i));
							let timestamp = this.constructor.getEventDate(date);
							let today = false;
							if (this.state.today === timestamp) today = true;
							let day = (
								<td id={timestamp} key={timestamp} className={today ? styles.today : ''}>
									<div>
										{this.state.events[timestamp] && !Object.values(this.state.events[timestamp]).every(e => !this.state.colourStatuses[e.color]) ? this.state.events[timestamp]
											.sort((a, b) => {
												if (a.start.getHours() !== b.start.getHours()) return a.start.getHours() - b.start.getHours();
												else return a.start.getMinutes() - b.start.getMinutes();
											})
											.map((event, i) => {
												return (
													<div className={styles.event} key={[timestamp, i].join('.')} style={this.state.colourStatuses[event.color] ? {} : {
														display: 'none'
													}}>
														<div className={styles.eventHeader}>
															{<h4 className={styles.eventName}>
																{<span className={styles.status} style={{
																	color: event.color
																}}>⬤</span>}
																{<span className='toolTip'>{/* TODO */}</span>}
																{event.facebookEvent ? <a className={styles.eventTitle} href={event.facebookEvent}>
																	{event.title}
																</a> : event.title}
															</h4>}
														</div>
														{<div>
															<h5>
																{this.constructor.getDisplayTime(event.start)}
																{' '}
																<a href={event.map} rel='noopener noreferrer' target='_blank'>
																	{event.location}
																</a>
																{'\n'}
																{event.description || null}
															</h5>
														</div>}
													</div>
												);
											})
											: <div className={styles.dateNumber}>{date.getDate()}</div>}
									</div>
								</td>
							);
							days.push(day);
						}
						return <tr key={'week.' + i}>
							<th scope='row' className={styles.firstColumn}>
								{'Week ' + i + '\n' + week.toDateString().slice(4, 10)}
							</th>
							{days}						
						</tr>;
					})}
				</tbody>
			</table>
		);
	}

	renderEvents() {
		let colours = {};
		Object.keys(this.state.calendarIDs).forEach((calendarId) => {
			axios({
				url: 'https://clients6.google.com/calendar/v3/calendars/' + calendarId + '/events',
				params: {
					calendarId,
					singleEvents: true,
					timeZone: 'Europe/London',
					maxAttendees: 1,
					maxResults: 250,
					sanitizeHtml: true,
					timeMin: new Date(this.state.start).toISOString(), //'2019-10-27T00:00:00Z',
					timeMax: new Date(this.state.finish).toISOString(), //'2019-12-01T00:00:00Z',
					key: 'AIzaSyDahTZUtTKORUdsOY3H7BEeOXbwye0nBHI' //AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs'
				}
			})
				.then((res) => {
					return [res.data.summary, res.data.items];
				})
				.then(([calendarName, events]) => {
					let res = events.map((event) => {			
						let color = this.state.calendarIDs[calendarId];
						if (!colours[color]) colours[color] = calendarName;
						return new Event(event, calendarName, color, this.state);
					});
					return [colours, res];
				})
				.then(([colours, events]) => {
					let dates = this.state.events;
					events.forEach((event) => {
						let date = this.constructor.getEventDate(event.start);
						if (!dates[date]) dates[date] = [];
						dates[date].push(event);
					});
					return [colours, dates];
				})
				.then(([colours, events]) => {
					let colourStatuses = Object.keys(colours).reduce((acc, curr) => {
						acc[curr] = true;
						return acc;
					}, {});
					this.setState({colours, colourStatuses, events});
				})
				.catch(console.error);
		});
	}

	updateColourStatuses(color) {
		let colourStatuses = Object.assign({}, this.state.colourStatuses);
		colourStatuses[color] = !colourStatuses[color];
		this.setState({
			colourStatuses
		});
	}

	renderKey() {
		let sorted = Object.entries(this.state.colours).sort((a, b) => {
			if (a[1] < b[1]) return -1;
			else if (a[1] > b[1]) return 1;
			else return 0;
		});
		return <div className={styles.key}>
			{sorted.map(([color, calendarName], i) => {
				return <div className={styles.key} key={['keyElement', i].join('.')}>
					{<span className={styles.status} onClick={() => this.updateColourStatuses(color)} style={{
						color
					}}>{this.state.colourStatuses[color] ? '\u2b24' : '\u2b58'}</span>}
					<h4>{'\u200b ' + calendarName}</h4>
				</div>;
			})}
		</div>;
	}

	getSettings() {
		return axios('https://oxfordunichess.github.io/oucc-backend/calendar.json')
			.then(res => res.data)
			.catch(console.error);
	}

	componentDidMount() {
		this.getSettings()
			.then((settings) => this.setState(Object.assign(this.state, settings)))
			.then(() => this.renderEvents());
	}

	render () {
		return (
			<>
				<Helmet>
					<title>{this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}</title>
				</Helmet>
				<div id="page">
					<div id='main' ref='main'>
						<h1>
							Termcard
						</h1>
						{this.renderKey()}
						{this.renderFrame()}
					</div>
				</div>
			</>
		);
	}

}