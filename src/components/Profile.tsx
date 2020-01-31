import React, {ReactElement} from 'react';
import url from 'url';
import { ProfileProps } from '../pages/interfaces';
import * as regexes from '../utils/regexes';
import { server } from '../utils/axios';

const styles = require('../css/components.module.css');

export default class Profile extends React.Component<ProfileProps> {

	render(): ReactElement {
		let src = regexes.href.test(this.props.thumbnail) ? this.props.thumbnail : url.resolve(server, 'images/logos/' + this.props.thumbnail);
		return (			
			<div className={styles.profile}> 				
				<div className={styles.rightPane}>
					<img className={styles.thumbnail} src={src} alt={this.props.thumbnail}/>
				</div>
				<div className={styles.leftPane}>
					<div>
						<h2>{this.props.name}</h2>
					</div>
					<div>
						<h3>{this.props.subtitle}</h3>
						{this.props.links.split('\\n')
							.map((line, i) => {
								let [text, href] = line.split(',');
								if (!href) return <h3 key={['text', i].join('.')}>{text}</h3>;
								return (
									<h3 key={['text', i].join('.')}>
										<a key={[text.slice(0, 5), i].join('.')} href={href} target='_blank' rel='noopener noreferrer'>{text}</a>
									</h3>
								);
							})}
					</div>
				</div>
				<div className={styles.centerPane}>
					<div className={styles.text}>{this.props.description.replace(regexes.newLineString, '\n\n')}</div>
				</div>
			</div>
		);
	}
}