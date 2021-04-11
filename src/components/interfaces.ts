import { ReactElement } from 'react';
import { MdastPlugin } from 'react-markdown';

export interface TableJSON {
	[key: string]: string | number,
}

export interface ProfileProps {
	name: string
	subtitle: string
	description: string
	links: string
	thumbnail: string
	facebook?: string
	twitter?: string
	instagram?: string
}

export type htmlParser = ({
	isValidNode,
	processingInstructions
}: {
	isValidNode: (node: parseHTMLElement) => boolean,
	processingInstructions: {
		shouldProcessNode: (node: parseHTMLElement) => boolean,
		processNode: (node: parseHTMLElement, children: parseHTMLElement[]) => ReactElement,
	}[]
}) => MdastPlugin

export interface parseHTMLElement extends HTMLElement {
	name: string
	attribs: {
		[key: string]: any
	}
	type: string
}

export interface CalendarGivenProps {
	mapsLink: string
	locationReplacers: {
		[key: string]: string
	}
	days: string[]
	sessionID?: string
	calendarIDs: {
		[key: string]: string
	}
}

interface IndexElement {
	title?: string;
	parent?: string;
	description?: string
	redirect?: string;
	open?: string;
	file?: string
	private?: boolean
}

export interface IndexData {
	[key: string]: IndexElement;
}

export interface Article {
	title: string
	image: string
	description: string
}