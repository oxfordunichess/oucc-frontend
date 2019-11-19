import React from 'react';
import styles from '../css/header.module.css';

const regexes = {
	space: /\s+/g,
	letters: /\w+/g
}
const fps = 60;

export default class Runner extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navigation: {},
			feedPosition: 0,
			_width: 0
		}
	}

	static setSection(location, id) {
		return process.env.PUBLIC_URL + '/curr_news#' + id;
	}

	getNewsFeed(inc) {
		let x = this.state._width;
		let y = window.innerWidth;
		return this.props.articles.map((text, i) => {
			let offsets = inc ? Object.entries(this.refs)
				.filter(([k]) => k.startsWith('feed'))
				.map(([_k, v]) => v.offsetLeft - this.state._width) : [];
			let transformation = inc ? (inc + offsets[i] - y) % x + y - offsets[i] : 0;
			if (typeof text !== 'string') return null;
			if (!text || typeof text.split !== 'function') {
				console.error('Bad Markdown document:\n', text);
				return null;
			}
			;
			let lines = text.split('\n');
			let header = lines.shift().trim();
			while (header.startsWith('#')) {
				header = header.slice(1);
			}
			let id = header.match(regexes.letters).join('-').toLowerCase();
			return [
			<div key={id + '.container'} style={inc ? {
				transform: `translate3d(${transformation}px, 0, 0)`
			} : {}}>
				<a href={this.constructor.setSection(window.location, id)} ref={'feed' + i} key={id}>
					{header}
				</a>
				{' • '}
			</div>]
		})
	}

	componentDidUpdate() {
		if (this.state._width) return;
		if (this.refs.dummy && this.refs.dummy.scrollWidth) this.setState({
			_width: this.refs.dummy.scrollWidth
		});
	}

	async componentDidMount() {
		setInterval(() => {
			let feedPosition = this.state.feedPosition;
			this.setState({
				feedPosition: feedPosition + 0.5
			})
		}, 1000 / fps);
	}

	render() {
		return (
			<div className={styles.newsFeed}>
				<div className={styles.intro}>
					Latest News: 
				</div>
				<div></div>
				<div className={styles.runner}>
					<div ref='runner'>
						{this.getNewsFeed(-this.state.feedPosition)}
					</div>
					<div ref='dummy' style={{
						visibility: 'hidden'
					}}>
						{this.getNewsFeed()}
					</div>
				</div>
			</div>
		)
	}
}