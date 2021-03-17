import { Fläche } from "../Constants";
import { Karte } from "../Karte";
const { Weg, Wegende, Wiese } = Fläche;

export class Dorf extends Karte {
	public static readonly count = 1;
	public readonly id = 1;

	constructor() {
		super({
			obenLinks: Wiese,
			obenMitte: Weg,
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

/*

const { Weg, Wegende, Wiese, Kloster, Stadt } = Fläche;

_teile = {
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

	mitteMitte: Wiese,
};

*/
