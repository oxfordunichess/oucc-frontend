import { ReactElement } from "react";

export interface RunnerProps {
	articles: string[];
}

export interface RunnerState {
	navigation: object;
	feedPosition: number;
	_width: number;
}

export interface Navigation {
	[key: string]: [
		string,
		string,
		string[]
	]
}

export type Side = 'left' | 'right';

export interface NavCache {
	left?: ReactElement;
	right?: ReactElement;
}