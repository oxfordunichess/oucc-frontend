import React, {ReactElement} from 'react';
import url from 'url';
import { ProfileProps } from '../pages/interfaces';

const styles = require('../css/components.module.css');
const server = 'https://oxfordunichess.github.io/oucc-backend/';

export default class Profile extends React.Component<ProfileProps> {

	render(): ReactElement {
		console.log(this.props.links.split('\\n'));
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
						{this.props.links.split('\\n')
							.map((line, i) => {
								let [text, href] = line.split(',');
								if (!href) return <h3>{text}</h3>;
								return (
									<h3>
										<a key={[text.slice(0, 5), i].join('.')} href={href} target='_blank' rel='noopener noreferrer'>{text}</a>
									</h3>
								);
							})}
					</div>
				</div>
				<div className={styles.centerPane}>
					<div className={styles.text}>{this.props.description.replace('\\n', '\n\n')}</div>
				</div>
			</div>
		);
	}
}