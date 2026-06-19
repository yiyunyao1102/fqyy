import { createGame } from "./game";

const container = document.getElementById("app");

if (!container) {
  throw new Error("Missing #app container");
}

createGame(container);
