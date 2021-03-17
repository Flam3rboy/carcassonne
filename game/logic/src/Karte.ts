import { Fläche, RICHTUNG, EINFACHERICHTUNG } from "./Constants";
import { Spieler } from "./Spieler";

const { Weg, Wegende, Wiese, Kloster, Stadt } = Fläche;

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Teil = {
	karte: Karte;
	fläche: Fläche;
	meeple?: Spieler;
	wappen?: boolean | number;
	verbindung: {
		oben?: Teil | boolean;
		unten?: Teil | boolean;
		rechts?: Teil | boolean;
		links?: Teil | boolean;
	};
};

export type Grid<T> = {
	obenLinks: T;
	obenMitte: T;
	obenRechts: T;
	linksOben: T;
	linksMitte: T;
	linksUnten: T;
	untenLinks: T;
	untenMitte: T;
	untenRechts: T;
	rechtsOben: T;
	rechtsMitte: T;
	rechtsUnten: T;
	mitteMitte: T;
};

type _TEILE = Grid<Fläche | PartialBy<PartialBy<Teil, "karte">, "verbindung">>;

export abstract class Karte {
	public readonly name: string;
	public readonly teile: Grid<Teil>;

	protected readonly _teile: _TEILE;
	private _rotation: number = 0;
	public readonly id: number;

	constructor(_teile: _TEILE) {
		this._teile = _teile;
		this.name = this.constructor.name;

		// @ts-ignore
		if (this.constructor.wappen > 0) {
			// @ts-ignore
			this.constructor.wappen--;
			// this.wappen = true;
		}

		this._initGrid();
	}

	_initGrid() {
		// @ts-ignore
		this.teile = {};
		// fächen setzen
		Object.keys(this._teile).forEach((k) => {
			let key = <RICHTUNG>k;
			if (typeof this._teile[key] === "object") {
				// @ts-ignore
				this.teile[key] = this._teile[key];
				this.teile[key].karte = this;
				if (!this.teile[key].verbindung) this.teile[key].verbindung = {};
			} else {
				this.teile[key] = {
					// @ts-ignore
					fläche: this._teile[key],
					verbindung: {},
					karte: this,
				};
			}
		});

		// automatisch verbindet die einzelnen gitter verbindungen
		const gitter = this.teileArray;
		const gitterKeys = Karte.teilePositionenNachKey;
		const self = this;

		Object.keys(this.teile).forEach((key) => {
			// @ts-ignore
			const teil = <Teil>self.teile[key];
			const verbindung = teil.verbindung;

			// @ts-ignore
			const position = gitterKeys[key];
			let z = 0;
			if (position.z && position.y === 1) z = 1;

			const positions = {
				unten: (gitter[position.y + 1] || [])[position.x],
				oben: (gitter[position.y - 1] || [])[position.x],
				rechts: gitter[position.y][position.x + 1],
				links: gitter[position.y][position.x - 1],
			};

			Object.keys(positions).forEach((p) => {
				const pos = <EINFACHERICHTUNG>p;
				let post = <Teil>positions[pos];

				if (Array.isArray(post)) post = post[z];
				if (!post || post.fläche !== teil.fläche) {
					if (post?.fläche === Wegende) verbindung[pos] = true;
					else verbindung[pos] = false;
				} else verbindung[pos] = post;
			});
		});
	}

	public kannPlatzieren(richtung: EINFACHERICHTUNG, karte: Karte | null): boolean {
		if (!karte) return true;
		// TODO: wege überprüfen, ob figur auf weg steht

		if (richtung === "oben") {
			return (
				this.teile.obenLinks.fläche === karte.teile.untenLinks.fläche &&
				this.teile.obenRechts.fläche === karte.teile.untenRechts.fläche &&
				this.teile.obenMitte.fläche === karte.teile.untenMitte.fläche
			);
		} else if (richtung === "unten") {
			return (
				this.teile.untenLinks.fläche === karte.teile.obenLinks.fläche &&
				this.teile.untenRechts.fläche === karte.teile.obenRechts.fläche &&
				this.teile.untenMitte.fläche === karte.teile.obenMitte.fläche
			);
		} else if (richtung === "rechts") {
			return (
				this.teile.rechtsOben.fläche === karte.teile.linksOben.fläche &&
				this.teile.rechtsUnten.fläche === karte.teile.linksUnten.fläche &&
				this.teile.rechtsMitte.fläche === karte.teile.linksMitte.fläche
			);
		} else if (richtung === "links") {
			return (
				this.teile.linksOben.fläche === karte.teile.rechtsOben.fläche &&
				this.teile.linksUnten.fläche === karte.teile.rechtsUnten.fläche &&
				this.teile.linksMitte.fläche === karte.teile.rechtsMitte.fläche
			);
		}

		return false;
	}

	get rotation() {
		return this._rotation;
	}

	getFelder(richtung: RICHTUNG): Teil[] {
		const startfeld = this.teile[richtung];
		const weg: Teil[] = [];

		function find4(feld: Teil): void {
			if (weg.includes(feld)) return;
			weg.push(feld);

			Object.values(feld.verbindung)
				.filter((x) => x && typeof x === "object")
				.map((x) => find4(<Teil>x));
		}

		find4(startfeld);
		return weg;
	}

	verbindungenSetzen({
		unten,
		oben,
		rechts,
		links,
	}: {
		unten: Karte | null;
		oben: Karte | null;
		rechts: Karte | null;
		links: Karte | null;
	}) {
		this.teile.linksOben.verbindung.links = links?.teile.rechtsOben;
		this.teile.linksMitte.verbindung.links = links?.teile.rechtsMitte;
		this.teile.linksUnten.verbindung.links = links?.teile.rechtsUnten;

		this.teile.rechtsOben.verbindung.rechts = rechts?.teile.linksOben;
		this.teile.rechtsMitte.verbindung.rechts = rechts?.teile.linksMitte;
		this.teile.rechtsUnten.verbindung.rechts = rechts?.teile.linksUnten;

		this.teile.obenMitte.verbindung.oben = oben?.teile.untenMitte;
		this.teile.obenLinks.verbindung.oben = oben?.teile.untenLinks;
		this.teile.obenRechts.verbindung.oben = oben?.teile.untenRechts;

		this.teile.untenMitte.verbindung.unten = unten?.teile.obenMitte;
		this.teile.untenLinks.verbindung.unten = unten?.teile.obenLinks;
		this.teile.untenRechts.verbindung.unten = unten?.teile.obenRechts;
	}

	rotieren(rotation: number): void {
		rotation = rotation % 4;
		this._rotation = rotation;
		// soll nicht dynamisches rotiert werden, für bessere performance
		// wird im urzeigersinn gedreht
		// TODO: Fehler werfen, wenn Karte schon auf brett gesetzt wurde

		for (let i = 0; i < rotation; i++) {
			const {
				obenLinks,
				obenMitte,
				obenRechts,
				linksOben,
				linksMitte,
				linksUnten,
				untenLinks,
				untenMitte,
				untenRechts,
				rechtsOben,
				rechtsMitte,
				rechtsUnten,
			} = this.teile;

			this.teile.untenMitte = rechtsMitte;
			this.teile.untenLinks = rechtsUnten;
			this.teile.untenRechts = rechtsOben;

			this.teile.linksMitte = untenMitte;
			this.teile.linksOben = untenLinks;
			this.teile.linksUnten = untenRechts;

			this.teile.obenMitte = linksMitte;
			this.teile.obenLinks = linksUnten;
			this.teile.obenRechts = linksOben;

			this.teile.rechtsUnten = obenRechts;
			this.teile.rechtsOben = obenLinks;
			this.teile.rechtsMitte = obenMitte;
		}
	}

	static get teilePositionenNachKey() {
		return {
			obenLinks: { y: 0, x: 0, z: 0 },
			obenMitte: { y: 0, x: 1 },
			obenRechts: { y: 0, x: 2, z: 0 },
			linksOben: { y: 0, x: 0, z: 1 },
			linksMitte: { y: 1, x: 0 },
			linksUnten: { y: 2, x: 0, z: 1 },
			untenLinks: { y: 2, x: 0, z: 0 },
			untenMitte: { y: 2, x: 1 },
			untenRechts: { y: 2, x: 2, z: 0 },
			rechtsOben: { y: 0, x: 2, z: 1 },
			rechtsMitte: { y: 1, x: 2 },
			rechtsUnten: { y: 2, x: 2, z: 2 },
			mitteMitte: { y: 1, x: 1 },
		};
	}

	static get teilePositionenNachArray() {
		return [
			[["linksOben", "obenLinks"], "obenMitte", ["obenRechts", "rechtsOben"]],
			["linksMitte", "mitteMitte", "rechtsMitte"],
			[["linksUnten", "untenLinks"], "untenMitte", ["untenRechts", "rechtsOben"]],
		];
	}

	get teileArray() {
		const {
			obenLinks,
			obenMitte,
			obenRechts,
			linksOben,
			linksMitte,
			linksUnten,
			untenLinks,
			untenMitte,
			untenRechts,
			rechtsOben,
			rechtsMitte,
			rechtsUnten,
			mitteMitte,
		} = this.teile;

		return [
			[[linksOben, obenLinks], obenMitte, [obenRechts, rechtsOben]],
			[linksMitte, mitteMitte, rechtsMitte],
			[[linksUnten, untenLinks], untenMitte, [untenRechts, rechtsUnten]],
		];
	}
}
