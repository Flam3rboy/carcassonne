import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese, Kloster, Stadt } = Fläche;

export class SchrägeStadt extends Karte {
	public static readonly count = 5;
	public readonly id = 17;

	constructor() {
		super({
			obenLinks: Stadt,
			obenMitte: Stadt,
			obenRechts: Stadt,

			linksOben: {
				fläche: Stadt,
				wappen: 2,
			},
			linksMitte: Stadt,
			linksUnten: Stadt,

			untenLinks: Wiese,
			untenMitte: Wiese,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Wiese,
			rechtsUnten: Wiese,

			mitteMitte: Wiese,
		});
	}
}
