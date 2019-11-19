import React from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import he from 'he';

import styles from '../css/calendar.module.css';

const regexes = {
	key: null,
	space: /\s+/g,
	facebook: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:events\/)?(?:[?\w-]*\/).+/
}

export default class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			today: this.constructor.getEventDate(Date.now()),
			start: new Date(props.start || '6 October 2019'),
			finish: new Date(props.finish || '8 December 2019'),
			events: {},
			colours: {},
			calendarIDs: {},
			locationReplacers: {},
			mapsLink: ''
		}
		window.location = this.constructor.setSection(window.location, this.state.today);
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
						{['MT\'19', 'SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'].map((day) => {
							return <th scope='column' key={day}>{day}</th>
						})}
					</tr>
				</thead>
				<tbody>						
					{weeks.map((week, i) => {
						let days = [];
						for (let i = 0; i < 7; i++) {
							let date = new Date(week).setDate(week.getDate() + i);
							date = this.constructor.getEventDate(new Date(date));
							let today = false;
							if (this.state.today === date) today = true;
							days.push(<td id={date} key={date} style={today ? {
								backgroundColor: 'PeachPuff'
							} : {}}>
								{(this.state.events[date] || [])
								.sort((a, b) => {
									if (a.start.getHours() !== b.start.getHours()) return a.start.getHours() - b.start.getHours();
									else return a.start.getMinutes() - b.start.getMinutes();
								})
								.map((event, i) => {

									let locationDisplay;
									let l = event.location.split(',').shift();
									if (this.state.locationReplacers[l]) locationDisplay = this.state.locationReplacers[l];
									else locationDisplay = l;

									let facebookEvent = '';
									if (regexes.facebook.test(event.description)) facebookEvent = event.description.match(regexes.facebook)[0];

									let description = event.description;
									
									let start = description.indexOf('<a');
									while (start !== -1) {
										let end = description.indexOf('/a>') + 3;
										description = description.slice(0, start) + description.slice(end);
										start = description.indexOf('<a');
									}
									description = description.replace(facebookEvent, '').trim();								

									return (
										<div className={styles.event} key={[date, i].join('.')}>
											<div className={styles.eventHeader}>
												{<span className={styles.status} style={{
													color: event.color
												}}>⬤ </span>}
												{<span className='toolTip'>{/* TODO */}</span>}
												{facebookEvent ? <a className={styles.eventTitle} href={facebookEvent}>
													<h4 className={styles.eventName}>{event.title}</h4>
												</a> : <h4 className={styles.noEvent}>{event.title}</h4>}
											</div>
											{<div>
												<h5>
													{this.constructor.getDisplayTime(event.start)}
													{' '}
													<a href={this.state.mapsLink + event.location.replace(regexes.space, '+')} rel='noopener noreferrer' target='_blank'>
														{locationDisplay}
													</a>
													{'\n'}
													{description || null}
												</h5>
											</div>}
										</div>
									)
								})}
							</td>)
						}
						return <tr key={'week.' + i}>
							<th scope='row'>
								{'Week ' + i + '\n' + week.toDateString().slice(4, 10)}
							</th>
							{days}						
						</tr>
					})}
				</tbody>
			</table>
		)
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
					return {
						created: event.created,
						link: event.htmlLink,
						title: event.summary,
						status: event.status,
						start: new Date(event.start.dateTime),
						end: new Date(event.end.dateTime),
						location: event.location || '',
						description: he.decode(event.description || ''),
						calendarName,
						color
					}
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
				this.setState({colours, events})
			})
			.catch(console.error);
		})
	}

	renderKey() {
		let sorted = Object.entries(this.state.colours).sort((a, b) => {
			if (a < b) return -1;
			else if (a > b) return 1;
			else return 0;
		});
		return <div className={styles.key}>
			{sorted.map(([color, calendarName], i) => {
				return <div className={styles.key} key={['keyElement', i].join('.')}>
					{<span className={styles.status} style={{
						color
					}}>⬤</span>}
					<h4>{'\u200b ' + calendarName}</h4>
				</div>
			})}
		</div>
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
		)
	}

}