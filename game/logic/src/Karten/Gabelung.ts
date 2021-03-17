import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese } = Fläche;

export class Gabelung extends Karte {
	public static readonly count = 4;
	public readonly id = 2;

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
			rechtsMitte: Weg,
			rechtsUnten: Wiese,

			mitteMitte: Wegende,
		});
	}
}
