import React, { ReactElement } from 'react';
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