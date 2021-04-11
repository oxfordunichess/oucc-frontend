import React, { useState, useCallback } from 'react';
import { Carousel as RRC } from 'react-responsive-carousel';
import Img from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { PhotoProps } from 'react-photo-gallery';
import styles from '../css/components.module.css';
import axios, { server } from '../utils/axios';
import url from 'url';
import { imageExt } from '../utils/regexes';

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
			source: url.resolve(server, src),
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
				maxRedirects: 5,
				headers: {
					Authorization: `token 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`
				}
			})
				.then(res => res.data)
				.then((data) => {
					return data.map((entry: GithubContentData, index: number) => {
						let filename = entry.path.split('/').pop() as string;
						let extension = filename.split('.').pop() as string;
						if (!imageExt.test(extension)) return null;
						let text = filename.slice(0, filename.length - extension.length - 1);
						let [name, customRatioSrc] = text.split('_');
						let customRatio = ratio;
						if (customRatioSrc) {
							if (customRatioSrc.split('.').length === 2) customRatio = customRatioSrc.split('.').map(v => parseInt(v)) as [number, number];
							else if (customRatioSrc && customRatioSrc.split(',').length === 2) customRatio = customRatioSrc.split(',').map(v => parseInt(v)) as [number, number];
						}
						return {
							index,
							src: url.resolve(server, entry.path),
							srcSet: url.resolve(server, entry.path),
							width: customRatio[0],
							height: customRatio[1],
							title: name
						};
					}).filter((v: Object | null) => v);
				})
				.then(setPhotos)
				.catch((e) => {
					console.error(e);
					return [];
				});
		}
	}

	const renderImage = useCallback(({ index, left, top, photo}: RenderImageProps) => {
		return <Img src={photo.src} width={photo.width} height={photo.height} />
	}, []);

	return (
		<div
			className={props.type === 'grid' ? styles.grid : styles.carousel}
		>
			{!photos.length ? null : props.type === 'grid' ?
				<Gallery	// Grid
					photos={photos}
					onClick={props.enableLightbox !== false ? openLightbox : () => {}}
					margin={props.margin || 2}
					columns={3}
					renderImage={renderImage}
					targetRowHeight={props.height || 200}
				/> :
				<RRC		//React-Reponsive-Carousel
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
								<img src={x.src} alt={x.alt} />
							</div>
						)
					})}
				</RRC>
			}
		</div>
	);
}

interface Image {
	source: string
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