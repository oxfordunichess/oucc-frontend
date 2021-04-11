import React, { ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { Link } from 'utils/link';
import { Side, NavCache, NavigationData } from './interfaces';

const styles = require('../../css/header.module.css');

interface BannerProps {
	navigation: NavigationData,
}
export default function Banner(props: BannerProps) {

	const navigation = props.navigation;

	return (
		<div className={styles.bannerContainer}>
			<div className={styles.banner}>
				<Nav side='left' {...{ navigation }} />
				<Link className={styles.oucc_logo} href='/' style={{
					backgroundImage: 'url(/images/oucclogo.jpg)',
					overflowY: 'visible'
				}}/>
				<Nav side='right' {...{ navigation }} />
			</div>
		</div>
	);
}

export function Nav({ side, navigation }: {
	side: Side
	navigation: NavigationData
}): ReactElement {

	const router = useRouter();

	const current = useMemo(() => {
		for (let [k, v] of Object.entries(navigation)) {
			if (router.asPath.startsWith('/' + k)) return k;
			let arr = v.slice(2) as [string, string][];
			for (let [path] of arr) {
				if (router.asPath.startsWith(path)) {
					return k;
				}
			}
		}
		return '';
	}, [router]);

	return (
		<div
			className={styles.nav + ' ' + styles[side]}
		>
			{side !== 'left' ? null : <div className={styles.section}>
				<div className={styles.spacer} />
			</div>}
			{Object.entries(navigation).map(([link, [s, name, ...children]], i) => {
				if (s !== side) return null;
				return (
					<div key={[name, i].join('.')} className={styles.section}>
						<Link
							className={cx(styles.dropParent, {
								[styles.selected]: current === link 
							})}
							key={link} href={'/' + link}>{name}
						</Link>
						<div className={styles.dropChildren}>
							{children.map(([link, name]) => {
								return (
									<Link key={link.slice(1)} href={link} className={cx(
										styles.dropParent,
										styles.dropChild,
										{
											[styles.selected]: current === link
										}
									)}>
										{name}
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
			{side !== 'right' ? null : <div className={styles.section}>
				<div className={styles.spacer} />
			</div>}
		</div>
	);

}