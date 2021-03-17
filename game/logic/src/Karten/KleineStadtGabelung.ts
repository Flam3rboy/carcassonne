import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese, Stadt } = Fläche;

export class KleineStadtGabelung extends Karte {
	public static readonly count = 3;
	public readonly id = 9;

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
			rechtsMitte: Weg,
			rechtsUnten: Wiese,

			mitteMitte: Wegende,
		});
	}
}
