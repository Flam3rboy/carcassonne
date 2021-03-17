export enum Fläche {
	Wiese = 1,
	Weg = 2,
	Wegende = 3,
	Kloster = 4,
	Stadt = 5,
}

export type WEGENDET = Fläche.Kloster | Fläche.Wegende | Fläche.Stadt;

export const MAX_PLAYERS = 5;

export type RICHTUNG =
	| "obenLinks"
	| "obenMitte"
	| "obenRechts"
	| "linksOben"
	| "linksMitte"
	| "linksUnten"
	| "untenLinks"
	| "untenRechts"
	| "untenMitte"
	| "rechtsUnten"
	| "rechtsMitte"
	| "rechtsOben"
	| "mitteMitte";

export const RICHTUNGEN = [
	["obenLinks", "linksOben"],
	["obenMitte"],
	["obenRechts", "rechtsOben"],
	["linksMitte"],
	["mitteMitte"],
	["rechtsMitte"],
	["linksUnten", "untenLinks"],
	["untenMitte"],
	["untenRechts", "rechtsUnten"],
];

export type EINFACHERICHTUNG = "oben" | "unten" | "rechts" | "links";

export enum KARTEN {
	Dorf = 1,
	Gabelung = 2,
	GanzeStadt = 3,
	GroßeStadt = 4,
	GroßeStadtWeg = 5,
	KleineStadt = 6,
	KleineDoppelStadtGegenüber = 7,
	KleineDoppelStadtNebeneinander = 8,
	KleineStadtGabelung = 9,
	KleineStadtLinksKurve = 10,
	KleineStadtRechtsKurve = 11,
	KleineStadtWeg = 12,
	Kloster = 13,
	KlosterWeg = 14,
	Kurve = 15,
	LangeStadt = 16,
	SchrägeStadt = 17,
	SchrägeStadtKurve = 18,
	Weg = 19,
}
