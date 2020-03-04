import React, { ReactElement } from 'react';
import { facebook, mail } from '../utils/thumbnails';
import styles from '../css/footer.module.css';

export default class Footer extends React.Component {

	render(): ReactElement {
		return (
			<div className={styles.footer}>
				<a className={styles.link} href='https://www.facebook.com/oxfordunichess/' target='_blank' rel='noopener noreferrer'>
					<img src={facebook} alt='Facebook Page' className={styles.image}/>
				</a>
				<a className={styles.link} href='https://www.facebook.com/groups/oxford.chess.club/' target='_blank' rel='noopener noreferrer'>
					<img src={facebook} alt='Facebook Group' className={styles.image}/>
				</a>
				<a className={styles.link} href='https://mailchi.mp/e4bab2111329/oxfordunichess' target='_blank' rel='noopener noreferrer'>
					<img src={mail} alt='Mailing List' className={styles.image}/>
				</a>
			</div>
		);
	}

}