import React, { ReactElement, useContext } from 'react';
import Calendar, { CalendarProps, CalendarSettings } from 'reactjs-google-calendar';
import { CalendarContext } from 'utils/contexts';

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
		/>
	);

}