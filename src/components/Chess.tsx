import React from 'react';
import FENConstructor from '../utils/fen';
const styles = require('css/components.module.css');

export function FEN(props: {
	src: string
}) {

	let fen = new FENConstructor(props.src);
	return (
		<div className={styles.board}>
			{fen.description}
			<a href={fen.analysisURL} target='_blank' rel='noopener noreferrer'>
				<img src={fen.imageURL} alt={'fen: ' + fen.positionfen}/>
			</a>
		</div>
	);
		
}