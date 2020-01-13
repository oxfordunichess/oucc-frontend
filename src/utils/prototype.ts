import * as regexes from './regexes';

export function capitalise(str: string): string {
	if (typeof str !== 'string') throw new TypeError();
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export function getIDFromTitle(str: string): string {
	while (str.startsWith('#')) {
		str = str.slice(1);
	}
	str = str.trim();
	return str.match(regexes.letters).join('-').toLowerCase();
}

export function BooleanDeserialise(str: string): {[key: number]: boolean, [key: string]: boolean} {
	return Object.fromEntries(str
		.split('&')
		.map(q => q.split('='))
		.map(([k, v]) => v === 'false' ? [k, false] : [k, true])
	);
}

export function BooleanSerialise(obj: {[key: number]: boolean, [key: string]: boolean}): string {
	return Object.entries(obj)
		.map(([k, v]) => k.toString() + '=' + v.toString())
		.join('&');
}