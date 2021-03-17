import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Wiese, Stadt } = Fläche;

export class KleineDoppelStadtNebeneinander extends Karte {
	public static readonly count = 2;
	public readonly id = 8;

	constructor() {
		super({
			obenLinks: {
				fläche: Stadt,
				verbindung: {
					unten: false,
					links: false,
				},
			},
			obenMitte: Stadt,
			obenRechts: Stadt,

			linksOben: {
				fläche: Stadt,
				verbindung: {
					rechts: false,
					oben: false,
				},
			},
			linksMitte: Stadt,
			linksUnten: Stadt,

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
