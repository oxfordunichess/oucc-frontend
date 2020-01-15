import React, { ReactElement } from 'react';
import url from 'url';
import { Link } from 'react-router-dom';
import * as regexes from './regexes';
import { server } from './axios';

interface aProps {
	href: string,
	children: HTMLElement[],
}

export function RouterLink(props: aProps): ReactElement {
	if (regexes.href.test(props.href)) {
		return <a href={props.href}>{props.children}</a>;
	} else
	if (props.href.startsWith('../')) {
		return <a href={url.resolve(server + 'pages/', props.href)}>{props.children}</a>
	} else
	if (props.href.startsWith('./')) {
		return <a href={url.resolve(server, props.href)}>{props.children}</a>
	} else {
		return <Link to={props.href}>{props.children}</Link>
	}
}