import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese, Kloster, Stadt } = Fläche;

// TODO wiese ist durchgängig

export class SchrägeStadtKurve extends Karte {
	public static readonly count = 5;
	public readonly id = 18;

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
			untenMitte: Weg,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Weg,
			rechtsUnten: Wiese,

			mitteMitte: Wiese,
		});
	}
}
