import { Spiel, Karte, Constants } from "carcassonne-logic";
import { Request, Router } from "express";
import { games } from "../../../data/games";
import { mapMinuxIndexArray } from "../../../Utils";

const router = Router();

router.get("/", (req, res) => {
	res.json(games.map((game, i) => i));
});

function getGame(req: Request): Spiel {
	// @ts-ignore
	const game = <Spiel>games[req.params.id];
	if (!game) throw new Error("Spiel nicht gefunden");
	return game;
}

router.get("/:id", (req, res) => {
	const game = getGame(req);
	const karten = mapMinuxIndexArray(game.brett.karten, (column: Karte[]) =>
		mapMinuxIndexArray(column, (karte: Karte) => {
			if (!karte) return {};
			const wappen = !!Object.values(karte.teile).find((x) => x.wappen);
			let figuren = {};
			Object.keys(karte.teile).forEach((key) => {
				// @ts-ignore
				figuren[key] = karte.teile[key].meeple?._id;
			});

			return { fläche: karte.id, rotation: karte.rotation, wappen, figuren };
		})
	);
	const ziehstapelLänge = game.ziehstapel.length;
	const spieler = game.spieler;

	res.json({ karten, ziehstapelLänge, spieler, letzteKarte: game.ziehstapel.last()?.id });
});

router.post("/:id/legen", (req, res) => {
	if (!req.body) throw "POST request muss einen body enthalten";
	const game = getGame(req);
	const { x, y, rotation, figur } = req.body;
	if (typeof x !== "number" || typeof y !== "number" || typeof rotation !== "number") {
		throw "x, y, rotation must be a number";
	}

	const karte = game.ziehen();
	karte.rotieren(rotation);
	if (figur && typeof figur === "number") {
		const keys = Constants.RICHTUNGEN[figur];
		const spieler = game.spieler[game.playersTurn];
		if (!spieler) throw "Spieler nicht gefunden";
		if (!keys) throw "Figur Feld nicht gefunden";

		for (const key of keys) {
			// @ts-ignore
			karte.teile[key].meeple = spieler;
		}
	}

	try {
		game.brett.platzieren(x, y, karte);
		game.playersTurn = (game.playersTurn + 1) % game.spieler.length;
	} catch (error) {
		game.ziehstapel[game.ziehstapel.length] = karte; // karte wieder zurücklegen in den stapel
		karte.rotieren(4 - (rotation % 4)); // karte wieder zurück rotieren
		Object.values(karte.teile).forEach((teil) => {
			// figuren wieder von karte nehmen
			teil.meeple = undefined;
		});
		throw error;
	}

	res.json({ success: true });
});

router.post("/", (req, res) => {
	if (!req.body) throw new Error("POST request muss einen body enthalten");
	const playerCount = parseInt(req.body.playerCount);
	if (isNaN(playerCount)) throw new Error("playerCount muss eine valide zahl sein");

	const game = games.push(new Spiel(playerCount)) - 1;
	res.json({ success: true, id: game });
});

export default router;
