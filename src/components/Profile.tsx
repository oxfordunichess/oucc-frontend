import React, {ReactElement} from 'react';
import url from 'url';
const styles = require('../css/components.module.css');
const server = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Profile extends React.Component<{
	name: string
	subtitle: string
	description: string
	links: string
	thumbnail: string
	facebook?: string
	twitter?: string
	instagram?: string
}> {

	render(): ReactElement {
		return (			
			<div className={styles.profile}> 				
				<div className={styles.rightPane}>
					<img className={styles.thumbnail} src={url.resolve(server, 'images/logos/' + this.props.thumbnail)} alt={this.props.thumbnail}/>
				</div>
				<div className={styles.leftPane}>
					<div>
						<h2>{this.props.name}</h2>
					</div>
					<div>
						<h3>{this.props.subtitle}</h3>
						<h3>{this.props.links.split('\n')
							.map((line) => {
								let [text, href] = line.split(',');
								if (!href) return text;
								return <a href={href} target='_blank' rel='nopener noreferrer'>{text}</a>
							})}</h3>
					</div>
				</div>
				<div className={styles.centerPane}>
					<div className={styles.text}>{this.props.description.replace('\\n', '\n\n')}</div>
				</div>
			</div>
		);
	}
}