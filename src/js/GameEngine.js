//import { Inputs } from "./Inputs.js";
import { FlyAway } from "./FlyAway.js";

export class GameEngine{

    constructor(controls, screen) {
        this.controls = controls;
        this.screen = screen;

        this.setupCanvas();
        this.seputControlListener();
        this.showStartScreen();
    }

    showStartScreen(){
        //Wollen wir einen StartScreen?
    }

    startGame(){
        console.log("start");
        this.game = new FlyAway();
        this.gameLoop();
    }
    
    gameLoop() {  
        if(this.game !== undefined) {
            requestAnimationFrame(this.gameLoop.bind(this));  
            this.renderContext.clearRect(0,0,this.screen.width, this.screen.height);
            this.game.tick(this.renderContext);
        }
    }

    setupCanvas() {
        this.renderContext = this.screen.getContext('2d');
        this.screen.classList.add("on");
    }


    restart() {
        delete this.game;
        console.log("restart");
    }

    savePlayersName(){
        console.log("savePlayersName");
    }
    
    seputControlListener() {  
        document.getElementById("start").addEventListener("click", this.startGame.bind(this));
        document.getElementById("restart").addEventListener("click", this.restart.bind(this));
        document.getElementById("enter").addEventListener("click", this.savePlayersName.bind(this));
    }    
}