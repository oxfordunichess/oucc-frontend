import React, { useContext } from 'react';
import Calendar from 'reactjs-google-calendar';
import { CalendarContext } from 'utils/contexts';

const styles = require('css/calendar.module.css');

export default function CalendarComponent({ start, finish, weeks, title }: {
	start: string
	finish: string
	weeks: string
	title: string
}) {

	const settings = useContext(CalendarContext);

	return (
		<Calendar
			calendars={settings.calendarIDs}
			start={new Date(start)}
			finish={new Date(finish)}
			weeks={parseInt(weeks)}
			title={title}
			settings={{
				...settings,
				APIkey: process.env.NEXT_PUBLIC_GOOGLE_API
			}}
			onError={console.error}
			classNames={styles}
		/>
	);

}