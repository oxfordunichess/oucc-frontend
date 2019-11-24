import { ReactElement } from "react";

export interface BannerState {
	subnav: string,
	navigation: NavigationData,
	navLeft: number,
	navRight: number
}

export interface BannerProps {
	sessionID: string;
}

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
			string
		]
	];
}

export type Side = 'left' | 'right';

export interface NavCache {
	left?: ReactElement;
	right?: ReactElement;
}