import { Fläche } from "../Constants";
import { Karte, Grid } from "../Karte";
const { Wiese, Stadt } = Fläche;

export class GroßeStadt extends Karte {
	public static readonly count = 4;
	public readonly id = 4;

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
			untenMitte: Wiese,
			untenRechts: Wiese,

			rechtsOben: Stadt,
			rechtsMitte: Stadt,
			rechtsUnten: Stadt,

			mitteMitte: Stadt,
		});
	}
}
