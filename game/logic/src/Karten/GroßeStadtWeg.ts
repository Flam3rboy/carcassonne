import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wiese, Stadt } = Fläche;

export class GroßeStadtWeg extends Karte {
	public static readonly count = 3;
	public readonly id = 5;

	constructor() {
		super({
			obenLinks: {
				fläche: Stadt,
				wappen: 1, // anzahl der wappen
			},
			obenMitte: Stadt,
			obenRechts: Stadt,

			linksOben: Stadt,
			linksMitte: Stadt,
			linksUnten: Stadt,

			untenLinks: Wiese,
			untenMitte: Weg,
			untenRechts: Wiese,

			rechtsOben: Stadt,
			rechtsMitte: Stadt,
			rechtsUnten: Stadt,

			mitteMitte: Stadt,
		});
	}
}
