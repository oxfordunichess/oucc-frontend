import cx from 'classnames';
import L from 'next/link';
import * as regexes from 'utils/regexes';
import { MutableRefObject } from 'react';

const styles = require('css/utils.module.css');

export function Link(props: React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
> & {
	forcediv?: 'true' | 'false',
	nostyle?: 'true' | 'false'
	myref?: MutableRefObject<HTMLAnchorElement>
}) {

	if (!props.href || props.forcediv === 'true') {
		return <div {...props as any} ref={props.myref} className={cx(styles.link, props.className, {
			[styles.noHover]: props.nostyle === 'true'
		})}>
			{props.children}
		</div>;
	}

	if (props.href.startsWith('#')) {
		return <a {...props as any} ref={props.myref}  className={cx(styles.link, props.className, {
			[styles.noHover]: props.nostyle === 'true'
		})}>
			{props.children}
		</a>;
	}

	if (regexes.link.test(props.href)) {
		return <a {...props as any} className={cx(styles.link, props.className, {
			[styles.noHover]: props.nostyle === 'true'
		})} target='_blank' rel='noopener noreferrer'>
			{props.children}
		</a>;
	}

	return <L href={props.href}>
		<a {...props as any} ref={props.myref}  className={cx(styles.link, props.className, {
			[styles.noHover]: props.nostyle === 'true'
		})}>
			{props.children}
		</a>
	</L>;

}