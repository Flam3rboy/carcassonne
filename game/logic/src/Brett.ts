import { Fläche, RICHTUNG } from "./Constants";
import { Karte } from "./Karte";
import { Kloster } from "./Karten/Kloster";
import { Spieler } from "./Spieler";

export class Brett {
	public karten: (Karte | null)[][] = [];

	constructor(startkarte: Karte) {
		// @ts-ignore
		this.karten = {
			"-1": { "-1": null, "0": null, "1": null },
			"0": { "-1": null, "0": startkarte, "1": null },
			"1": { "-1": null, "0": null, "1": null },
		};
	}

	kannPlatzieren(x: number, y: number, karte: Karte): boolean {
		if (!karte) return false;
		if (!this.karten[y]) this.karten[y] = [];
		if (this.karten[y][x]) return false;
		if (!this.karten[y + 1]) this.karten[y + 1] = [];
		if (!this.karten[y - 1]) this.karten[y - 1] = [];

		// prüfen, ob an allen kanten mindestens eine andere karte ist
		if (!this.karten[y + 1][x] && !this.karten[y - 1][x] && !this.karten[y][x + 1] && !this.karten[y][x - 1])
			return false;

		// prüfen, ob karte an alle kanten passt

		return (
			karte.kannPlatzieren("unten", this.karten[y + 1][x]) &&
			karte.kannPlatzieren("oben", this.karten[y - 1][x]) &&
			karte.kannPlatzieren("links", this.karten[y][x - 1]) &&
			karte.kannPlatzieren("rechts", this.karten[y][x + 1])
		);
	}

	platzieren(x: number, y: number, karte: Karte) {
		if (!this.kannPlatzieren(x, y, karte)) throw `Diese Karte kann hier nicht gesetzt werden`;

		const { karten } = this;

		const unten = karten[y + 1][x];
		const oben = karten[y - 1][x];
		const rechts = karten[y][x + 1];
		const links = karten[y][x - 1];

		karte.verbindungenSetzen({ unten, oben, rechts, links });

		this.zusammenzählen(x, y, karte);
		const ys = Object.keys(karten)
			.map((x) => parseInt(x))
			.sort((a, b) => a - b);
		const xs = ys
			// @ts-ignore
			.map((y) => Object.keys(karten[y]))
			.flat()
			.map((x) => parseInt(x))
			.sort((a, b) => a - b);

		let lowestY = <number>(ys.first() === y ? y - 1 : ys.first());
		let highestY = <number>(ys.last() === y ? y + 1 : ys.last());
		let lowestX = <number>(xs.first() === x ? x - 1 : xs.first());
		let highestX = <number>(xs.last() === x ? x + 1 : xs.last());

		// fill array with zer0s
		for (let y = lowestY; y <= highestY; y++) {
			// @ts-ignore
			if (!karten[y]) karten[y] = [];
			for (let x = lowestX; x <= highestX; x++) {
				// @ts-ignore
				if (!karten[y][x]) karten[y][x] = null;
			}
		}

		karten[y][x] = karte;
	}

	private zusammenzählen(x: number, y: number, karte: Karte, override: boolean = false) {
		if (!karte) return;
		Object.keys(karte.teile).every((r) => {
			const richtung = <RICHTUNG>r;
			const feld = karte.teile[<RICHTUNG>richtung];
			const felder = karte.getFelder(<RICHTUNG>richtung);
			const spieler = <Spieler[]>felder.map((x) => x.meeple).filter((x) => x);
			const gewerteteSpieler = <Spieler[]>getHighestCount(spieler);
			let istWegStadtGeschlossen;
			let istKlosterGeschlossen;

			if (feld.meeple && spieler.length) throw `Auf dieser Struktur ist bereits eine Figur`;
			if (!spieler.length) return; // keine spieler auf dem weg -> gibt nichts zum zusammenzählen

			if (feld.fläche === Fläche.Weg || feld.fläche === Fläche.Stadt) {
				istWegStadtGeschlossen = felder.find(
					(x) => Object.values(x.verbindung).filter((v) => v == null).length
				);
				const karten = felder.map((x) => x.karte).unique();

				if (istWegStadtGeschlossen || override) {
					let punkte = karten.length;
					if (feld.fläche === Fläche.Stadt && !override) {
						punkte = karten.length * 2;
					}
					gewerteteSpieler.forEach((s) => s.addPunkte(punkte));
					figurenEinsammeln();
				}
			} else if (feld.fläche === Fläche.Kloster) {
				let klosterGeschlossen = 0;

				for (let yI = -1; yI <= 1; yI++) {
					for (let xI = -1; xI <= 1; xI++) {
						if (this.karten[yI + y][xI + x]) klosterGeschlossen++;
					}
				}

				istKlosterGeschlossen = klosterGeschlossen === 9;

				if (istKlosterGeschlossen || override) {
					gewerteteSpieler.forEach((s) => s.addPunkte(klosterGeschlossen));
					figurenEinsammeln();
				}
			}
			// TODO: Bauern regel

			function figurenEinsammeln() {
				felder.forEach((x) => (x.meeple = undefined));
				spieler.forEach((s) => s.removeFigur());
			}
		});
	}

	allesZusammenzählen() {
		const self = this;
		const weg: (Karte | null)[] = [];

		function collect(x: number, y: number) {
			const karte = self.karten[y][x];
			if (weg.includes(karte) || !karte) return;

			weg.push(karte);
			self.zusammenzählen(x, y, karte, true);

			collect(x + 1, y);
			collect(x - 1, y);
			collect(x, y + 1);
			collect(x, y - 1);
		}

		collect(0, 0);
	}
}

function getHighestCount(array: any[]): any[] {
	if (array.length == 0) return [];
	var modeMap: any = {},
		maxCount = 1,
		modes = [];

	for (var i = 0; i < array.length; i++) {
		var el = array[i];

		if (modeMap[el] == null) modeMap[el] = 1;
		else modeMap[el]++;

		if (modeMap[el] > maxCount) {
			modes = [el];
			maxCount = modeMap[el];
		} else if (modeMap[el] == maxCount) {
			modes.push(el);
			maxCount = modeMap[el];
		}
	}
	return modes;
}
