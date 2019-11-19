import React from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import he from 'he';

import Header from '../common/header';

import styles from '../css/calendar.module.css';

const mapsLink = 'https://www.google.com/maps/search/';
const regexes = {
	space: /\s+/g,
	facebook: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:events\/)?(?:[?\w-]*\/).+/
}
const locationReplacers = {
	'Christ Church Cathedral': 'Christ Church'
}

const calendarIDs = {
	'oxfordunichess@gmail.com': 'blue',	//events
	'f8r5s6amq4momsc2s7nrt8vees@group.calendar.google.com': 'red',			//clubnights
	'knp5bmtf8m80o02fa13c1a0j5c@group.calendar.google.com': 'orange',		//teaching
	'frs8s1f9ue1kq7p1ht9oa93sv4@group.calendar.google.com': 'yellow',		//socials
	'q46oqbjuu9f0hg68pehm961b9o@group.calendar.google.com': 'lawngreen',	//Uni1
	'mliver9tvb2mv4pq1uifce3ed0@group.calendar.google.com': 'limegreen',	//Uni2
	'vk8arnd9ol0hsjr26il70pjib8@group.calendar.google.com': 'forestgreen'	//Uni3
}

export default class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			start: new Date(props.start || '6 October 2019'),
			finish: new Date(props.finish || '8 December 2019'),
			events: {}
		}
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
			curr.setDate(this.state.start.getDate() + 7 * i);
			weeks.push(curr);
		}	
		return this._frame = (
			<table className={styles.table}>
				<thead>
					{['MT\'19', 'SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'].map((day) => {
						return <th scope='column' key={day}>{day}</th>
					})}
				</thead>
				<tbody>						
					{weeks.map((week, i) => {
						let days = [];
						for (let i = 0; i < 7; i++) {
							let date = new Date(week).setDate(week.getDate() + i);
							date = this.constructor.getEventDate(new Date(date));
							days.push(<td id={date} key={date}>
								{(this.state.events[date] || []).map((event, i) => {

									let locationDisplay;
									let l = event.location.split(',').shift();
									if (locationReplacers[l]) locationDisplay = locationReplacers[l];
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
									if (facebookEvent) console.log(facebookEvent, description, description.replace(facebookEvent, ''))
									description = description.replace(facebookEvent, '').trim();

									return (
										<div className={styles.event} key={[date, i].join('.')}>
											<div className={styles.eventHeader}>
												{<span className={styles.status} style={{
													color: calendarIDs[event.calendarId]
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
													<a href={mapsLink + event.location.replace(regexes.space, '+')} rel='noopener noreferrer' target='_blank'>
														{locationDisplay}
													</a>
													{'\n'}
													{description || ''}
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

	renderCalendar() {
		Object.keys(calendarIDs).map((calendarId) => {
			axios({
				url: 'https://clients6.google.com/calendar/v3/calendars/' + calendarId + '/events',
				params: {
					calendarId,
					singleEvents: true,
					timeZone: 'Europe/London',
					maxAttendees: 1,
					maxResults: 250,
					sanitizeHtml: true,
					timeMin: this.state.start.toISOString(), //'2019-10-27T00:00:00Z',
					timeMax: this.state.finish.toISOString(), //'2019-12-01T00:00:00Z',
					key: 'AIzaSyDahTZUtTKORUdsOY3H7BEeOXbwye0nBHI' //AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs'
				}
			})
			.then((res) => {
				return [res.data.summary, res.data.items];
			})
			.then(([calendarName, events]) => {
				return events.map((event) => {
					return {
						created: event.created,
						link: event.htmlLink,
						title: event.summary,
						status: event.status,
						start: new Date(event.start.dateTime),
						end: new Date(event.end.dateTime),
						location: event.location,
						description: he.decode(event.description || ''),
						calendarId,
						calendarName
					}
				});
			})
			.then((events) => {
				let dates = this.state.events;
				events.forEach((event) => {
					let date = this.constructor.getEventDate(event.start);
					if (!dates[date]) dates[date] = [];
					dates[date].push(event);
				});
				return dates;
			})
			.then((events) => {
				this.setState({events})
			})
			.catch(console.error);
		})
	}

	async componentDidMount() {
		if (this.state.start && this.state.finish) this.renderCalendar();
	}

    render () {
		return (
			<>
				<Helmet>
					<title>{this.props.title ? this.props.title + ' | OUCC' : 'OUCC'}</title>
				</Helmet>
				<Header parent={this.props.parent} />
				<div id="page">
					<div id='main' ref='main' style={{
						marginLeft: 30,
						marginRight: 30
					}}>
						<h1>
							Termcard
						</h1>
						{this.renderFrame()}
						{this.state.calendar}
					</div>
				</div>
			</>
		)
	}

}