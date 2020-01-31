import React, { ReactElement } from 'react';
import FENConstructor from '../utils/fen';
import styles from '../css/components.module.css';

export class FEN extends React.Component<{
	src: string
}> {

	render(): ReactElement {
		let fen = new FENConstructor(this.props.src);
		return (
			<div className={styles.board}>
				{fen.description}
				<a href={fen.analysisURL} target='_blank' rel='noopener noreferrer'>
					<img src={fen.imageURL} alt={'fen: ' + fen.positionfen}/>
				</a>
			</div>
		);
	}
}