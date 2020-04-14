
import { Ballon } from "./GameObject.js";

export class FlyAway{

    constructor(){
        console.log("constructor FlyAway")
        this.start
    }

    start(){
        this.gameOver = false;
        this.points = 0;
        this.lives = 3;

        let sizePlayer = 50;
        this.player = new Ballon(300, 300, sizePlayer, sizePlayer, "#101010", 8);
    }

    update(ctx){
        //this.player.update(ctx);
    }


    draw(ctx){
        //this.player.draw(ctx);
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


