import Event from './event';

export interface StyleDictionary {
	[key: string]: string
}

export interface EventDictionary {
	[key: string]: Event[]
}

export interface CalendarState {
	calendarIDs: StringDictionary,
	today: number,
	start: Date,
	finish: Date,
	weeks: number,
	events: EventDictionary,
	calendars: ParsedCalendarDictionary,
	locationReplacers: StringDictionary,
	mapsLink: string,
	days: string[]
}

export interface CalendarSettings {
	calendarIDs: StringDictionary,
	mapsLink: string,
	locationReplacers: StringDictionary,
	start: string,
	finish: string,
	weeks: number,
	title: string,
	days: string[]
}

export interface CalendarProps {
	settings: CalendarSettings
	styles: StyleDictionary
}

export interface GoogleLocation extends String {};

export interface GoogleDate {
	dateTime: string
}

export interface GoogleEvent {
	created: string,
	htmlLink: string,
	summary: string,
	start: GoogleDate,
	end: GoogleDate,
	status: string,
	location: GoogleLocation,
	description: string
}

export interface StringDictionary {
	[key: string]: string
}

export interface BooleanDictionary {
	[key: string]: boolean
}

export interface GoogleCalendar {
	kind: string
	etag: string
	summary: string
	update: string
	timeZone: string
	accessRole: string
	defaultReminders: any[]
	nextSyncToken: string
	items: GoogleEvent[]
	description?: string
}

export interface ParsedCalendar {
	id: string
	name: string
	description: string
	color: string
	status: boolean
}

//TODO
export interface ParsedCalendarDictionary {
	[key: string]: ParsedCalendar
}