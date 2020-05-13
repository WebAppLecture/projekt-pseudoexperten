import { GameEngine } from "./GameEngine.js";

fetch("src/data/data.json")
    .then(e => e.json())
    .then(json => {
        let gameName = document.createElement("h1");

        gameName.innerHTML = json.gameName;

        document.body.insertBefore(gameName, document.body.firstChild);
    });


window.gameEngine = new GameEngine(
    document.querySelector(".game-controls"),
    document.querySelector(".screen"));