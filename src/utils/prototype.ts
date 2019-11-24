import regexes from './regexes';

export function capitalise(str: string): string {
	if (typeof str !== 'string') throw new TypeError();
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export function getIDFromTitle(str :string): string {
	while (str.startsWith('#')) {
		str = str.slice(1);
	}
	str = str.trim();
	return str.match(regexes.letters).join('-').toLowerCase();
}