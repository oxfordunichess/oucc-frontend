import * as regexes from './regexes';

export function isDev(): boolean {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		return true;
	} else {
		return false;
	}
}

export function updateMobile(): boolean {
    if (typeof navigator === 'undefined') return false;
	let str: string = navigator.userAgent || navigator.vendor || '';
	if (regexes.mobile[0].test(str)) return true;
	if (regexes.mobile[1].test(str.substr(0, 4))) return true;
	return false;
}

export function isVisible(elem: HTMLElement): boolean {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity && Number(style.opacity) < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
		if (pointContainer === elem) return true;
	/* eslint-disable-next-line no-cond-assign */
    } while (pointContainer = (pointContainer || {}).parentNode as Element);
    return false;
}