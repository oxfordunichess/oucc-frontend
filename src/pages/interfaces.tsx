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

export interface CalendarProps {
	styles: string,
	settings: string,
	start: string,
	finish: string,
	weeks: string,
	title: string,
	sessionID?: string
}