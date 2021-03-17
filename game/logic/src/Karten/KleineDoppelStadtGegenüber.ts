import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Wiese, Stadt } = Fläche;

export class KleineDoppelStadtGegenüber extends Karte {
	public static readonly count = 3;
	public readonly id = 7;

	constructor() {
		super({
			obenLinks: {
				fläche: Wiese,
			},
			obenMitte: Wiese,
			obenRechts: Wiese,

			linksOben: Stadt,
			linksMitte: Stadt,
			linksUnten: Stadt,

			untenLinks: Wiese,
			untenMitte: Wiese,
			untenRechts: Wiese,

			rechtsOben: Stadt,
			rechtsMitte: Stadt,
			rechtsUnten: Stadt,

			mitteMitte: Wiese,
		});
	}
}
