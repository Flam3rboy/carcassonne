import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese, Kloster, Stadt } = Fläche;

export class Kurve extends Karte {
	public static readonly count = 8;
	public readonly id = 15;

	constructor() {
		super({
			obenLinks: Wiese,
			obenMitte: Wiese,
			obenRechts: Wiese,

			linksOben: Wiese,
			linksMitte: Weg,
			linksUnten: Wiese,

			untenLinks: Wiese,
			untenMitte: Weg,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Wiese,
			rechtsUnten: Wiese,

			mitteMitte: Weg,
		});
	}
}
