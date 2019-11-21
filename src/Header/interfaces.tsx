import { ReactElement } from "react";

export interface RunnerProps {
	articles: string[];
}

export interface RunnerState {
	navigation: object;
	feedPosition: number;
	_width: number;
}

export interface NavigationData {
	[key: string]: [
		string,
		string,
		[
			string,
			string,
			boolean,
			boolean
		]
	];
}

export type Side = 'left' | 'right';

export interface NavCache {
	left?: ReactElement;
	right?: ReactElement;
}