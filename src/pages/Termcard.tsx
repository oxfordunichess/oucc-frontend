import React, { ReactElement } from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Calendar from '../Calendar';
import {CalendarSettings, StringDictionary} from '../Calendar/interfaces';

export default class Header extends React.Component<{
	title: string,
	sessionID: string
}, {
	settings: CalendarSettings
}> {

	state = {
		settings: {
			calendarIDs: {} as StringDictionary,
			mapsLink: '',
			locationReplacers: {} as StringDictionary,
			start: '',
			finish: '',
			title: '',
			days: []
		} as CalendarSettings
	}

	getSettings(): Promise<any> {
		return axios({
			baseURL: 'https://oxfordunichess.github.io/oucc-backend/',
			url: 'calendar.json',
			params: {sessionID: this.props.sessionID}
		})
			.then(res => res.data)
			.catch(console.error);
	}

	componentDidMount() {
		this.getSettings().then((settings) => this.setState({settings: Object.assign(this.state.settings, settings)}))
	}

	render(): ReactElement {
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
						<Calendar sessionID={this.props.sessionID} settings={this.state.settings}/>
					</div>
				</div>
			</>
		);
	}

}