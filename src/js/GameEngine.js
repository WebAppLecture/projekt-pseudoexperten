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
        let element = document.getElementById('screen');
 
        if(element.getContext) {
          let context = element.getContext('2d'),
          text = 'Don’t worry, don’t cry, drink vodka and fly.';
     
          context.clearRect(0, 0, element.width, element.height);
          context.fillStyle = 'black';
          context.strokeStyle = 'black';
          context.font = '30px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(text, element.width / 2, element.height / 2);
          context.strokeText(text, element.width / 2, element.height / 2);
        }
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
        this.renderContext.clearRect(0,0,this.screen.width, this.screen.height);
        this.showStartScreen();
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