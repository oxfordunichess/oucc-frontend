
import React, { ReactElement } from 'react';

import Profile from '../components/Profile';
import Table from '../components/Table';
import { FEN } from '../components/Chess';
import Calendar from '../components/Calendar';
import Form, { FormProps, Jotform, JotFormProps } from '../components/Form';
import { ProfileProps, parseHTMLElement, CalendarProps, htmlParser as def } from '../components/interfaces';
import Album, { AlbumProps } from '../components/Image';

const htmlParser: def = require('react-markdown/plugins/html-parser');
const HtmlToReact = require('html-to-react');

// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
export function parseHtml() {
	return htmlParser({
		isValidNode: (node: parseHTMLElement) => node.type !== 'script',
		processingInstructions: [
			{
				// Custom album processing
				shouldProcessNode: function (node: parseHTMLElement): boolean {
					if (node.name === 'grid') return true;
					if (node.name === 'carousel') return true;
					return false;
				},
				processNode: function (node: parseHTMLElement, children: parseHTMLElement[]): ReactElement {
					return <Album {...node.attribs as AlbumProps} type={node.name as 'grid' | 'carousel'} />;
				}
			},
			{
				// Custom <Table> processing
				shouldProcessNode: function (node: parseHTMLElement): boolean {
					return node.name === 'data-table';
				},
				processNode: function (node: parseHTMLElement, children: parseHTMLElement[]): ReactElement {
					return <Table {...node.attribs as {src: string}} />;
				}
			},
			{
				// Custom <Calendar> processing
				shouldProcessNode: function (node: parseHTMLElement): boolean {
					return node.name === 'calendar';
				},
				processNode: function (node: parseHTMLElement, children: parseHTMLElement[]): ReactElement {
					return <Calendar {...node.attribs as CalendarProps} />;
				}
			},
			{
				// Custom <Profile> processing
				shouldProcessNode:(node: parseHTMLElement): boolean => {
					return node.name === 'profile';
				},
				processNode: (node: parseHTMLElement, children: parseHTMLElement[]): ReactElement => {
					return <Profile {...node.attribs as ProfileProps}/>;
				}
			},
			{
				// Custom <Form> processing
				shouldProcessNode:(node: parseHTMLElement): boolean => {
					return node.name === 'form';
				},
				processNode: (node: parseHTMLElement, children: parseHTMLElement[]): ReactElement => {
					return <Form {...node.attribs as FormProps}/>;
				}
			},
			{
				// Custom <Jotform> processing
				shouldProcessNode:(node: parseHTMLElement): boolean => {
					return node.name === 'jotform';
				},
				processNode: (node: parseHTMLElement, children: parseHTMLElement[]): ReactElement => {
					return <Jotform {...node.attribs as JotFormProps}/>;
				}
			},
			{
				// Custom <FEN> processing
				shouldProcessNode:(node: parseHTMLElement): boolean => {
					return node.name === 'fen';
				},
				processNode: (node: parseHTMLElement, children: parseHTMLElement[]): ReactElement => {
					return <FEN {...node.attribs as {src: string}}/>;
				}
			},
			{
				// Anything else
				shouldProcessNode: function (node: parseHTMLElement): boolean {
					return true;
				},
				processNode: processNodeDefinitions.processDefaultNode as (node: Node, children: Node[]) => ReactElement
			}
		]
	});
}