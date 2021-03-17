export class Spieler {
	private _punkte: number = 0;
	private _figuren: number = 7;
	public readonly _id: number = Spieler._idCounter++;
	public static _idCounter: number = 0;

	constructor() {}

	get figuren() {
		return this._figuren;
	}

	get punkte() {
		return this._punkte;
	}

	addPunkte(score: number) {
		this._punkte += score;
	}

	removeFigur() {
		this._figuren++;
	}

	addFigur() {
		this._figuren++;
	}

	async zug() {}
}
