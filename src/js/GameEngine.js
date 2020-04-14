//import { Inputs } from "./Inputs.js";
import { FlyAway } from "./FlyAway.js";

export class GameEngine{

    constructor(controls, screen) {
        this.controls = controls;
        this.screen = screen;

        this.setupCanvas();
        this.setupControls();
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

    setupCanvas() {
        this.renderContext = this.screen.getContext('2d');
        this.screen.classList.add("on");
    }

    gameLoop() {  
        if(this.game !== undefined) {
            console.log("game is undefined");
            requestAnimationFrame(this.gameLoop.bind(this));  
            this.renderContext.clearRect(0,0,this.screen.width, this.screen.height);
            this.game.tick(this.renderContext);
        }
    }

    restart() {
        delete this.game;
        console.log("restart");
    }

    setupControls() {
        this.seputControlListener();
    }
    
    seputControlListener() {      
        document.querySelectorAll("*.button").forEach(control => {
            console.log(control);
            console.log(control.addEventListener("click", this.onButtonClicked.bind(this)));
            control.addEventListener("click", this.onButtonClicked.bind(this));
        });
    }

    onButtonClicked(event){
        this.input(event.target.id, true);
    }

    input(type, active) {
        if(active && this.buttonInteraction.hasOwnProperty(type)) {
            this.buttonInteraction[type]();
        }
    }

    savePlayersName(){
        console.log("savePlayersName");
    }

    get buttonInteraction() {
        return {
            "restart": () => this.restart(),
            "start": () => this.startGame(),
            "enter": () => this.savePlayersName(),
        }
    }
    
}