import React, { MutableRefObject, ReactElement, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Link } from 'utils/link';
import * as regexes from 'utils/regexes';
const fps = 60;
const styles = require('css/header.module.css');

export default function Runner(props: {
	articles: string[];
}) {

	const [width, setWidth] = useState(0);
	const [feedPosition, updateFeedPosition] = useReducer((state: number) => {
		return state - 0.5;
	}, 0);
	const modPosition = useMemo(() => feedPosition & width ? feedPosition % (2 * width) : 0, [feedPosition, width]);

	const runnerRef = useRef(null as HTMLDivElement);
	const dummyRef = useRef(null as HTMLDivElement);

	useEffect(() => {
		if (!runnerRef.current) return;
		setWidth(runnerRef.current.scrollWidth);
	}, [setWidth, runnerRef, props.articles]);

	useEffect(() => {
		let x = setInterval(updateFeedPosition, 1000 / fps);
		return () => clearInterval(x);
	}, [updateFeedPosition]);

	return (
		<div className={styles.newsFeed}>
			<div className={styles.intro}>
				Latest News: 
			</div>
			<div></div>
			<div className={styles.runner} ref={runnerRef}>
				<div style={feedPosition ? { left: modPosition + 'px' } : {}}>
					<NewsFeed feedPosition={-feedPosition} width={width} articles={props.articles} myRefs={{ runnerRef, dummyRef }} />
				</div>
				<div style={feedPosition ? { left: (modPosition + width) + 'px' } : {}}>
					<NewsFeed feedPosition={-feedPosition} width={width} articles={props.articles} myRefs={{ runnerRef, dummyRef }} />
				</div>
			</div>
		</div>
	);

}

function NewsFeed(props: {
	feedPosition?: number,
	width: number
	articles: string[]
	myRefs: {
		[key: string]: MutableRefObject<HTMLDivElement>
	}
}) {

	return <>
		{props.articles.map((text: string, i: number): ReactElement => {
			if (typeof text !== 'string') return null;
			if (!text || typeof text.split !== 'function') {
				console.error('Bad Markdown document:\n', text);
				return null;
			}
			
			let lines = text.split('\n');
			let header = lines.shift().trim();
			while (header.startsWith('#')) {
				header = header.slice(1);
			}
			let id = header.match(regexes.letters).join('-').toLowerCase();
			
			return (
				<div key={id + '.container'}>
					<Link href={'#' + id} key={id}>
						{header}
					</Link>
					{' • '}
				</div>
			);
		})}
	</>;
}