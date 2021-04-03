import React, { ReactElement } from 'react';
import axios from '../utils/axios';
import Calendar, { CalendarProps, CalendarSettings } from 'reactjs-google-calendar';
import { google } from './Auth/config';

interface Settings {
	calendarIDs: {[key: string]: string}
	mapsLink: string
	locationReplacers: {[key: string]: string}
}
export default function Header({ settings, start, finish, weeks, title }: {
	settings: Settings
	start: string
	finish: string
	weeks: string
	title: string
}) {

	return (
		<Calendar
			calendars={settings.calendarIDs}
			start={new Date(start)}
			finish={new Date(finish)}
			weeks={parseInt(weeks)}
			title={title}
			settings={{
				...settings,
				APIkey: google
			}}
		/>
	);

}