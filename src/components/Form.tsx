import React, { ReactElement, CSSProperties, RefObject } from 'react';
import styles from '../css/components.module.css';

export interface FormProps {
	action: string
	method: 'POST' | 'GET'
	fields: string
	submit: string
	reset?: string
}

export default class Form extends React.Component<FormProps> {

	render(): ReactElement {
		return (
			<form className={styles.contactForm} method={this.props.method} action={this.props.action}>
				<table className={styles.contactTable}>
					<tbody>
						{this.props.fields.split('\\n').map(line => line.split(',')).map(([k, v], i) => {
							return (
								<tr key={[k, i].join('.')}>
									<th>{v + ':'}</th>
									<td>
										{
											k !== 'message' ?
											<input className={styles.input} type='text' name={k} size={55}/> :
											<textarea className={styles.textarea} name='message' rows={6}/>
										}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<br/>
				<input type='submit' name='Submit' value={this.props.submit}/>
				{this.props.reset ? <input type='reset' value={this.props.reset}/> : null}
			</form>
		);
	}
}
interface Doc extends Document {
    exitFullscreen: any;
    mozCancelFullScreen: any;
    webkitExitFullscreen: any;
    fullscreenElement: any;
    mozFullScreenElement: any;
	webkitFullscreenElement: any;
	msExitFullscreen: any;
}

export interface JotFormProps {
	id: string
	title: string
	src: string
	style?: string
}

export class Jotform extends React.Component<JotFormProps> {

	private iframe: RefObject<HTMLIFrameElement>;
	private container: RefObject<HTMLDivElement>;

	componentDidMount() {
		let handleIFrameMessage = (e: MessageEvent) => {
			if (typeof e.data === 'object') return;
			var args = e.data.split(":");
			let iframe = this.iframe ? this.iframe.current : null;
			if (!iframe) return;
			switch (args[0]) {
				case "scrollIntoView":
					iframe.scrollIntoView();
					break;
				case "setHeight":
					iframe.style.height = args[1] + "px";
					if (this.container && this.container.current) this.container.current.style.height = (Number(args[1]) - 48) + 'px';
					console.log(iframe.style.height, this.container.current.style.height)
					break;
				case "collapseErrorPage":
					if (iframe.clientHeight > window.innerHeight) {
						iframe.style.height = window.innerHeight + "px";
					}
					break;
				case "reloadPage":
					window.location.reload();
					break;
				case "loadScript":
					var src = args[1];
					if (args.length > 3) {
						src = args[1] + ':' + args[2];
					}
					var script = document.createElement('script');
					script.src = src;
					script.type = 'text/javascript';
					document.body.appendChild(script);
					break;
				case "exitFullscreen":
					let doc = window.document as Doc;
					if (doc.exitFullscreen) doc.exitFullscreen();
					else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
					else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
					else if (doc.msExitFullscreen) doc.msExitFullscreen();
					break;
			}
			var isJotForm = (e.origin.indexOf("jotform") > -1) ? true : false;
			if (isJotForm && "contentWindow" in iframe && "postMessage" in iframe.contentWindow) {
				var urls = {
					"docurl": encodeURIComponent(document.URL),
					"referrer": encodeURIComponent(document.referrer)
				};
				iframe.contentWindow.postMessage(JSON.stringify({
					"type": "urls",
					"value": urls
				}), "*");
			}
		};
		window.addEventListener("message", handleIFrameMessage, false);
	}

	interpretStyle(style: string): {[key: string]: string} {
		return style.split('\n').map(line => line.split(': ')).reduce((acc, [k, v]) => {
			acc[k] = v;
			return acc;
		}, {} as {[key: string]: string});
	}

	render() {
		let style = this.interpretStyle(this.props.style || '');
		return (
			<div className={styles.jotform} ref={this.container} style={{
				height: '491px'
			}}>
				<iframe
					ref={this.iframe}
					title={this.props.title}
					onLoad={() => window.parent.scrollTo(0, 0)}
					allowTransparency={true}
					allowFullScreen={true}
					allow="geolocation; microphone; camera"
					src={this.props.src}
					frameBorder={0}
					style={Object.assign({
						minWidth: '100%',
						height: '539px',
						border: 'none'
					}, style)}
				/>
			</div>
		);
	}

}