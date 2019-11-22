import {ReactElement, ReactPropTypes} from 'react';

export interface TableProps extends ReactPropTypes {
	src: string,
	sessionID: string
}

export interface TableState {
	table: ReactElement | null,
}

export interface TableJSON {
	[key: string]: string | number,
}