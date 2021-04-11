import { ReactElement } from 'react';

export interface NavigationData {
	[key: string]: [
		string,
		string,
		[
			string,
			string
		]
	];
}

export type Side = 'left' | 'right';

export interface NavCache {
	left?: ReactElement;
	right?: ReactElement;
}