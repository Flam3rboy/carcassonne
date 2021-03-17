import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Wegende, Wiese, Kloster, Stadt } = Fläche;

export class Weg extends Karte {
	public static readonly count = 8;
	public readonly id = 19;

	constructor() {
		super({
			obenLinks: Wiese,
			obenMitte: Wiese,
			obenRechts: Wiese,

			linksOben: Wiese,
			linksMitte: Fläche.Weg,
			linksUnten: Wiese,

			untenLinks: Wiese,
			untenMitte: Wiese,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Fläche.Weg,
			rechtsUnten: Wiese,

			mitteMitte: Fläche.Weg,
		});
	}
}
