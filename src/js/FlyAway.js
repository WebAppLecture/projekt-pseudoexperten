
import { Ballon } from "./GameObject.js";

export class FlyAway{

    constructor(){
        this.start();
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
        //this.player.update(ctx);
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

    bindControls(){
        this.inputBinding = {
            "left": this.player.left.bind(this.player),
            "right": this.player.right.bind(this.player),
            "down": this.player.down.bind(this.player),
            "up": this.player.up.bind(this.player)
        };
    }

    static get NAME(){
        return "Fly Away";
    }
}


