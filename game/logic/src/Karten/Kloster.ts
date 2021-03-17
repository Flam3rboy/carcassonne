import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Wiese } = Fläche;

export class Kloster extends Karte {
	public static readonly count = 4;
	public readonly id = 13;

	constructor() {
		super({
			obenLinks: Wiese,
			obenMitte: Wiese,
			obenRechts: Wiese,

			linksOben: Wiese,
			linksMitte: Wiese,
			linksUnten: Wiese,

			untenLinks: Wiese,
			untenMitte: Wiese,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Wiese,
			rechtsUnten: Wiese,

			mitteMitte: Fläche.Kloster,
		});
	}
}
