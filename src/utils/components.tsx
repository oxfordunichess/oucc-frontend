import React, { ReactElement } from 'react';
import {Link} from 'react-router-dom';
import * as regexes from './regexes';

interface aProps {
	href: string,
	children: HTMLElement[],
}

export function RouterLink(props: aProps): ReactElement {
	if (regexes.href.test(props.href)) return <a href={props.href}>{props.children}</a>;
	return <Link to={props.href}>{props.children}</Link>
}