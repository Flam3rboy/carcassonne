import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese, Kloster, Stadt } = Fläche;

export class LangeStadt extends Karte {
	public static readonly count = 3;
	public readonly id = 16;

	constructor() {
		super({
			obenLinks: Wiese,
			obenMitte: Wiese,
			obenRechts: Wiese,

			linksOben: {
				fläche: Stadt,
				wappen: 2,
			},
			linksMitte: Stadt,
			linksUnten: Stadt,

			untenLinks: Wiese,
			untenMitte: Wiese,
			untenRechts: Wiese,

			rechtsOben: Stadt,
			rechtsMitte: Stadt,
			rechtsUnten: Stadt,

			mitteMitte: Stadt,
		});
	}
}
