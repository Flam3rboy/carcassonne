import { Fläche } from "../Constants";
import { Karte } from "../Karte";

const { Weg, Wiese, Stadt } = Fläche;

export class KleineStadtLinksKurve extends Karte {
	public static readonly count = 3;
	public readonly id = 10;

	constructor() {
		super({
			obenLinks: Stadt,
			obenMitte: Stadt,
			obenRechts: Stadt,

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
