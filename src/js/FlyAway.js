
import { Ballon } from "./GameObject.js";

export class FlyAway{

    constructor(){
        this.start();
        this.setupGameControls();
        //this.bindControls();
    }

    start(){
        this.gameOver = false;
        this.points = 0;
        this.lives = 3;
        
        //player
        let sizePlayer = 30;
        this.player = new Ballon(300, 300, sizePlayer, 8);
        console.log(this.player);
    }

    update(ctx){
        this.player.update(ctx);
    }


    draw(ctx){
        this.player.draw(ctx);
    }

    tick(ctx) {
        if(this.gameOver) {
            this.gameOverScreen(ctx);
            return;
        }
        this.update(ctx);
        this.draw(ctx);
    }

    setupGameControls(){
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 37) {
                this.buttonInteraction["left"]();
            }
            else if(event.keyCode == 39) {
                this.buttonInteraction["right"]();
            }else if(event.keyCode == 40){
                this.buttonInteraction["down"]();
            }else if(event.keyCode == 38){
                this.buttonInteraction["up"]();
            }
        });
        document.addEventListener("keyup", function(event){});
    }
   

    /*bindControls(){
        this.inputBinding = {*/
    get buttonInteraction() {
                return {
            "left": () => this.player.left.bind(this.player),
            "right": () => this.player.right.bind(this.player),
            "down": () => this.player.down.bind(this.player),
            "up": () => this.player.up.bind(this.player)
        };
    }
}


