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
        this.renderContext.clearRect(0,0,this.screen.width, this.screen.height);
        this.showStartScreen();
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