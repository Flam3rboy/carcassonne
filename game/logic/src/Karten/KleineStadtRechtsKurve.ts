import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wiese, Stadt } = Fläche;

export class KleineStadtRechtsKurve extends Karte {
	public static readonly count = 3;
	public readonly id = 11;

	constructor() {
		super({
			obenLinks: Stadt,
			obenMitte: Stadt,
			obenRechts: Stadt,

			linksOben: Wiese,
			linksMitte: Wiese,
			linksUnten: Wiese,

			untenLinks: Wiese,
			untenMitte: Weg,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Weg,
			rechtsUnten: Wiese,

			mitteMitte: Weg,
		});
	}
}
