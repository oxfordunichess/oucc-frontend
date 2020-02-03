import React, { useState, useCallback } from 'react';
import { Carousel as RRC, CarouselProps as rrcProps } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Gallery from 'react-photo-gallery';
import Lightbox, { Modal, ModalGateway } from 'react-images';
import { PhotoProps } from 'react-photo-gallery';
import styles from '../css/components.module.css';
import axios, { server } from '../utils/axios';
import url from 'url';

export default function Album(props: AlbumProps) {

	const ratio = props.ratio.split(',').map(v => parseInt(v));

	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);
	const [photos, setPhotos] = useState(props.photos ? props.photos.split(',').map((src: string, index: number) => {
		let filename = src.split('/').pop() as string;
		let extension = filename.split('.').pop() as string;
		let text = filename.slice(0, filename.length - extension.length - 1);
		let [name, customRatioSrc] = text.split('_');
		let customRatio = customRatioSrc ? customRatioSrc.split('.').map(v => parseInt(v)) : ratio;
		return {
			index,
			src: url.resolve(server, src),
			srcSet: url.resolve(server, src),
			width: customRatio[0],
			height: customRatio[1],
			title: name
		};
	}) as Image[] : [] as Image[]);

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
	};
	if (!photos.length) {
		if (props.src) {
			axios({
				baseURL: 'https://api.github.com/repos/oxfordunichess/oucc-backend/contents/',
				url: url.resolve('pages/', props.src),
				method: 'get',
				maxRedirects: 5
			})
				.then(res => res.data)
				.then((data) => {
					return data.map((entry: GithubContentData, index: number) => {
						let filename = entry.path.split('/').pop() as string;
						let extension = filename.split('.').pop() as string;
						let text = filename.slice(0, filename.length - extension.length - 1);
						let [name, customRatioSrc] = text.split('_');
						let customRatio = customRatioSrc ? customRatioSrc.split('.').map(v => parseInt(v)) : ratio;
						return {
							index,
							src: url.resolve(server, entry.path),
							srcSet: url.resolve(server, entry.path),
							width: customRatio[0],
							height: customRatio[1],
							title: name
						};
					});
				})
				.then(setPhotos)
				.catch((e) => {
					console.error(e);
					return [];
				});
		}
	}

	return (
		<div
			className={props.type === 'grid' ? styles.grid : styles.carousel}
		>
			{!photos.length ? null : props.type === 'grid' ?
				<Gallery
					photos={photos}
					onClick={props.enableLightbox !== false ? openLightbox : () => {}}
					margin={props.margin || 2}
					columns={3}
					targetRowHeight={props.height || 200}
				/> :
				<RRC
					onClickItem={props.enableLightbox !== false ? openLightbox : () => {}}
					infiniteLoop={true}
					useKeyboardArrows={true}
					showStatus={false}
					emulateTouch={true}
					axis={props.axis || 'horizontal'}
					autoPlay={props.autoPlay !== false}
					width={'100%'}
					selectedItem={props.selectedItem || 0}
					showThumbs={props.showThumbs !== false}
					interval={props.interval || 4000}
					transitionTime={props.transitionTime || 500}
					centerMode={props.centerMode || false}
					dynamicHeight={props.dynamicHeight || true}
				>
					{photos.map((x, i) => {
						if (!x) return null;
						return (
							<div key={x.src + '.' + i.toString()}>
								<img
									src={x.src}
									alt={x.alt}
								></img>
							</div>
						)
					})}
				</RRC>
			}
			{props.enableLightbox !== false ? (
				<ModalGateway>
					{!viewerIsOpen ?  null : (
						<Modal onClose={closeLightbox}>
							<Lightbox
								onClose={closeLightbox}
								currentImage={currentImage}
								views={photos.map(x => ({
									...x,
									caption: x.title
								}))}
							/>
						</Modal>
					)}
				</ModalGateway>
			) : null}
		</div>
	);
}

interface Image {
	src: string
	title: string
	width: number
	height: number
	alt?: string
}

export interface AlbumProps extends PhotoProps {
	type: 'carousel' | 'grid'
	enableLightbox: boolean

	photos?: string
	src: string,
	axis?: 'vertical' | 'horizontal',
	autoPlay?: boolean
	selectedItem?: number
	showThumbs?: boolean
	interval?: number
	transitionTime?: number
	centerMode?: boolean
	dynamicHeight?: boolean

	margin?: number
	targetRowHeight?: number
	ratio?: string
}

interface GithubContentData {
	name: string
	path: string
	sha: string
	size: number
	url: string
	html_url: string
	git_url: string
	download_url: string
	type: 'file'
	_links: {
		self: string,
		git: string,
		html: string
	},
	width: number
	height: number
}