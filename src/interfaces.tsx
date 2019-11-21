export interface GithubData {
	name: string,
	sha: string,
}

interface IndexElement {
	title?: string;
	parent?: string;
	redirect?: string;
}

export interface IndexData {
	[key: string]: string | IndexElement;
}