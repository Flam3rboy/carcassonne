import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese, Kloster, Stadt } = Fläche;

export class KlosterWeg extends Karte {
	public static readonly count = 2;
	public readonly id = 14;

	constructor() {
		super({
			obenLinks: Wiese,
			obenMitte: Wiese,
			obenRechts: Wiese,

			linksOben: Wiese,
			linksMitte: Wiese,
			linksUnten: Wiese,

			untenLinks: Wiese,
			untenMitte: Weg,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Wiese,
			rechtsUnten: Wiese,

			mitteMitte: Kloster,
		});
	}
}
