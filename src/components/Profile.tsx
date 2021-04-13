import React, {ReactElement} from 'react';
import { ProfileProps } from './interfaces';
import * as regexes from 'utils/regexes';
import { server } from 'utils/axios';

const styles = require('../css/components.module.css');

export default function Profile(props: ProfileProps) {
	
	let src = regexes.href.test(props.thumbnail) ? props.thumbnail : new URL('images/logos/' + props.thumbnail, server).href;

	return (			
		<div className={styles.profile}> 				
			<div className={styles.rightPane}>
				<img className={styles.thumbnail} src={src} alt={props.thumbnail}/>
			</div>
			<div className={styles.leftPane}>
				<div>
					<h2>{props.name}</h2>
				</div>
				<div>
					<h3>{props.subtitle}</h3>
					{props.links.split('\\n')
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
				<div className={styles.text}>
					{props.description.replace(regexes.newLineString, '\n\n')}
				</div>
			</div>
		</div>
	);
		
}