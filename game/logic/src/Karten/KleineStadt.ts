import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Wiese, Stadt } = Fläche;

export class KleineStadt extends Karte {
	public static readonly count = 5;
	public readonly id = 6;

	constructor() {
		super({
			obenLinks: Stadt,
			obenMitte: Stadt,
			obenRechts: Stadt,

			linksOben: Wiese,
			linksMitte: Wiese,
			linksUnten: Wiese,

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
