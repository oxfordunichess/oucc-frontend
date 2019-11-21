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