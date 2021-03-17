import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wiese, Stadt } = Fläche;

export class KleineStadtWeg extends Karte {
	public static readonly count = 2; // count ist nur 2, weil das die startkarte ist
	public readonly id = 12;

	constructor() {
		super({
			obenLinks: Stadt,
			obenMitte: Stadt,
			obenRechts: Stadt,

			linksOben: Wiese,
			linksMitte: Weg,
			linksUnten: Wiese,

			untenLinks: Wiese,
			untenMitte: Wiese,
			untenRechts: Wiese,

			rechtsOben: Wiese,
			rechtsMitte: Weg,
			rechtsUnten: Wiese,

			mitteMitte: Weg,
		});
	}
}
