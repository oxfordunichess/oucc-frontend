import React, { ReactElement } from 'react';
import axios from 'axios';
import Calendar from '../Calendar';
import {CalendarSettings, StringDictionary} from '../Calendar/interfaces';

export default class Header extends React.Component<{
	styles: string,
	settings: string,
	start: string,
	finish: string,
	weeks: string,
	title: string,
	sessionID?: string
}, {
	styles: StringDictionary,
	settings: CalendarSettings
}> {

	state = {
		styles: (() => {
			try {
				return require('../css/' + this.props.styles) as StringDictionary;
			} catch (e) {
				return {} as StringDictionary;
			}
		})(),
		settings: {
			calendarIDs: {} as StringDictionary,
			mapsLink: '',
			locationReplacers: {} as StringDictionary,
			start: this.props.start,
			finish: this.props.finish,
			weeks: parseInt(this.props.weeks),
			title: this.props.title,
			days: []
		} as CalendarSettings
	}

	getSettings(url: string): Promise<any> {
		if (!url) return Promise.reject();
		return axios({
			baseURL: 'https://oxfordunichess.github.io/oucc-backend/',
			url,
			params: {
				sessionID: this.props.sessionID
			}
		})
			.then(res => res.data)
			.catch(console.error);
	}

	componentDidMount() {
		this.getSettings(this.props.settings)
			.then((settings) => this.setState({settings: Object.assign(this.state.settings, settings)}))
			.catch(() => {})
	}

	render(): ReactElement {
		return (
			<Calendar settings={this.state.settings} styles={this.state.styles}/>
		);
	}

}