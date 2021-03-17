import { Spiel } from "../Spiel";

const spiel = new Spiel();

spiel.starten();
// @ts-ignore
global.spiel = spiel;

setTimeout(() => {}, 1000000);
