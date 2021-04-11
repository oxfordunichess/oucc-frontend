export const __esModule = true;

export interface GithubFile {
	name: string,
	sha: string,
}

interface CommitAuthor {
	name: string,
	email: string,
	date: string
}

interface CommitTree {
	sha: string,
	url: string
}

interface CommitVerification {
	verified: boolean
	reason: string;
	signature: string | null;
	payload: string | null;
}

interface CommitParent {
	sha: string;
	url: string;
	html_url: string;
}

export interface GithubCommit {
	sha: string,
	'node-id': string,
	commit: {
		author: CommitAuthor,
		committer: CommitAuthor,
		message: string,
		tree: CommitTree,
		url: string,
		comment_count: number,
		verification: CommitVerification
	}
	url: string;
	html_url: string;
	comments_url: string;
	parents: CommitParent;
}