export function capitalise(str: string): string {
	if (typeof str !== 'string') throw new TypeError();
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}