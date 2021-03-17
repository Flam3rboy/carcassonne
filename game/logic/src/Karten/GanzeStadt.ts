import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Stadt } = Fläche;

export class GanzeStadt extends Karte {
	public static readonly count = 1;
	public readonly id = 3;

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

			untenLinks: Stadt,
			untenMitte: Stadt,
			untenRechts: Stadt,

			rechtsOben: Stadt,
			rechtsMitte: Stadt,
			rechtsUnten: Stadt,

			mitteMitte: Stadt,
		});
	}
}
