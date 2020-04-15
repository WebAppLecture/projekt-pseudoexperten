
import { Ballon } from "./GameObject.js";

export class FlyAway{

    constructor(){
        this.start();
        this.setupGameControls();
        //this.gameLoop();
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

    /*gameLoop() {  
        if(this.game !== undefined) {
            requestAnimationFrame(this.gameLoop.bind(this));  
            this.renderContext.clearRect(0,0,this.screen.width, this.screen.height);
            this.game.tick(this.renderContext);
        }
    }*/


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

        document.addEventListener('keydown', event => {
            if(event.keyCode == 37) {
                this.player.left.bind(this.player);
            }
            else if(event.keyCode == 39) {
                this.player.right.bind(this.player);
                console.log("right");
            }else if(event.keyCode == 40){
                this.player.down.bind(this.player);
            }else if(event.keyCode == 38){
                this.player.up.bind(this.player);
            }
        });
        document.addEventListener("keyup", event =>{});
    }
}


