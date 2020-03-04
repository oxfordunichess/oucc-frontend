import qs from 'querystring';

const config = {
	board: "icy_sea",
	pieces: "alpha",
	coords: 0,
	size: 2,
	url: {
		board: 'https://www.chess.com/dynboard|',
		analysis: 'https://lichess.org/analysis?fen=|',
		crazyhouse: 'https://lichess.org/analysis/crazyhouse/|',
		threeCheck: 'https://lichess.org/analysis/threeCheck/|',
		"racing-kings": '',
		chess: ''
	}
};

export default class FEN {

	/**
	 * String used to compile (lazy-load) a regex
	 */
	static get regexString (): string {
		return '((?:(?:[pnbrqkPNBRQK~1-8]{1,8})\\/?){8})' + //Piece Placement: any of those characters, allow 1 to 8 of each, folloed by a slash, all that repeated 8 times. Standard chess FEN produced. Slash is optional (0 or 1). 
            '((?:[pnbrqkPNBRQK]{1,31})\\/?)?' + //Second group: crazyhouse additional inhand pieces, if they exist.
            '\\s+' + //white space
            '(b|w)' + //Side to Move
            '\\s+' + //white space
            '(-|K?Q?k?q?)' + //Castling Rights. Matches 0 or 1 of each, so optional.
            '\\s+' + //white space
            '(-|[a-h][3-6])' + //En Passant Possible Target Squares
            '\\s+' + //white space
            '(\\d+)' + //Half-Move Clock since last capture or pawn advance for 50 move rule
            '\\s+' + //white space
            '(\\d+)' + //Fullmove number
            '\\s*' + //white space, may or may not exist
            '(\\+[0-3]\\+[0-3])?'; //three-check extra group, may or may not exist
	}

	private static _regex: RegExp;
	static get regex (): RegExp {
		if (FEN._regex) return FEN._regex;
		return FEN._regex = new RegExp(FEN.regexString);
	}

	constructor (public argument: string) {
		if (!this.fen) throw new Error('Invalid FEN!');
	}

	toJSON() {
		return {
			colour: this.colour,
			analysisURL: this.analysisURL,
			imageURL: this.imageURL,
			description: this.description
		};
	}

	/* The difficulty here is, not parsing the url to the analysis board, which thank to lichess is just some variant of their analysis url followed by the fen,
	But getting the url to display the board for chess.com and parsing and generating the specialiased variant info.
	That means the additional pieces for crazyhouse and the additional checks for threeCheck, then working out how to display them.
	this.fen returns the simple full fen.
	this.positionfen returns the the board position which for standard chess is the same as this.fen
	*/
	private _fenArray: string[];
	get fenArray(): string[] {
		if (this._fenArray) return this._fenArray;
		let fenArray = this.argument.match(FEN.regex);
		return this._fenArray = fenArray || []; //returns matches witch capture groups [full string, ...each () match group]
	}

	private _positionFenArray: string[];
	get positionFenArray(): string[] { //array of 6 items, beginning at 0 ending with 5.
		if (this._positionFenArray) return this._positionFenArray;
		let fenArray = this.fenArray.slice(1).reduce((acc, curr) => {
			if (curr === null || curr === undefined) return acc;
			else acc.push(curr);
			return acc;
		}, []); //first exec match is always full match
		if (fenArray[0].endsWith('/')) fenArray[0] = fenArray[0].slice(0, -1); //removes extra backslash prone to messing shit up
		if (this.variant === 'crazyhouse') fenArray.splice(1, 1); //remove zh group
		else if (this.variant === 'threeCheck') fenArray.splice(6, 1); //remove threecheck group
		return this._positionFenArray = fenArray;
	}

	get fen(): string {
		return this.fenArray[0];
	}

	get positionfen(): string {
		return this.positionFenArray.join(' ').replace(/~/, '');
	}
    
	get colour (): 'white' | 'black' {
		if (this.positionFenArray[1] === 'b') return 'black';
		return 'white';
	}

	private _flip: boolean;
	get flip(): boolean {
		if (this._flip) return this._flip;
		if (this.variant === 'racing-kings') return false;
		return this._flip = this.colour === 'black';
	}

	private _variant: 'crazyhouse' | 'threeCheck' | 'racing-kings' | 'chess';
	get variant(): 'crazyhouse' | 'threeCheck' | 'racing-kings' | 'chess' {
		if (this._variant) return this._variant;
		if (this.inhand) return this._variant = 'crazyhouse';
		if (this.checks) return this._variant = 'threeCheck';
		return this._variant = 'chess';
	}

	get inhand(): string[] | undefined { //a crazyhouse thing
		if (!this.fenArray[2]) return undefined;
		let crazyhouseRegExp = /(?:[pnbrqkPNBRQK]{1,16})\/?/;
		let fen = this.fenArray[2].match(crazyhouseRegExp);
		fen[1] = fen[0].replace(/[^A-Z]/g, '');
		fen[2] = fen[0].replace(/[^a-z]/g, '');
		return fen || [];
	}

	private _checks: [string, number, number]
	get checks():  [string, number, number] | undefined {
		if (this._checks) return this._checks;
		if (!this.fenArray[8]) return undefined;
		let threeCheckRegExp = /\+([0-3])\+([0-3])/;
		let checks = this.fenArray[8].match(threeCheckRegExp).map(c => !isNaN(Number(c)) ? Number(c) : c) as [string, number, number];
		return this._checks = checks || [this.fenArray[8], 0, 0];
	}

	get description(): string {
		if (!/^crazyhouse|threeCheck$/.test(this.variant)) return '';
		let winhandstring, binhandstring;
		if (this.variant === 'crazyhouse') {
			winhandstring = this.inhand[1].split('').join(' '); //converts them to arrays of each character
			binhandstring = this.inhand[2].split('').join(' '); //white in-hand pieces, black in-hand pieces
		} else if (this.variant === 'threeCheck') {
			winhandstring = 'White checks: ' + ('+'.repeat(this.checks[1]) || '').bold();
			binhandstring = 'Black checks: ' + ('+'.repeat(this.checks[2]) || '').bold();
		}
		return this.flip ? winhandstring + '\n' + binhandstring : binhandstring + '\n' + winhandstring;
	}
    
	get lastMove(): string | null {
		return null;
	}

	get imageURL(): string {
		return config.url.board.replace('|', '?' + qs.stringify({
			fen: this.positionfen,
			board: config.board,
			piece: config.pieces,
			coordinates: config.coords,
			size: config.size, 
			flip: this.flip ? 1 : 0,
			ext: '.png'
		}));
	}

	get analysisURL(): string { //encode for chess
		let str = config.url[this.variant];
		if (!str) return config.url.analysis.replace('|', encodeURIComponent(this.fen));
		return str.replace('|', this.fen.replace(/\s+/g, '_'));
	} //as is with modified spaces for variants

}