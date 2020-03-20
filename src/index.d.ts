/*
// Overwrite bad declaration from @types/react-images
declare module 'react-images' {
	import React from 'react';
	import * as Lightbox from 'react-images';
	namespace Lightbox {
		export interface LightboxProps extends Lightbox.LightboxProps {
			views: Lightbox.Image[]
			currentIndex?: number;
		}
		export default class Lightbox extends React.Component<LightboxProps> {}
	}
}
*/

declare module 'lichess' {
	declare class lichess {
		setToken(token: string): lichess
		teams: {
			join(id: string): Promise<null>
		}
	}
	export default lichess;
}
