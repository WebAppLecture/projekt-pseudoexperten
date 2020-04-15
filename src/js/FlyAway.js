
import { Ballon } from "./GameObject.js";

export class FlyAway{

    constructor(ctx){
        this.start();
        this.setupGameControls(ctx);
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
        this.drawBoundingBox(ctx)
    }

    drawBoundingBox(ctx) {
        ctx.strokeStyle = "#6bd26b";
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, ctx.canvas.width - 20, ctx.canvas.height - 20);
    }

    tick(ctx) {
        if(this.gameOver) {
            this.gameOverScreen(ctx);
            return;
        }
        this.update(ctx);
        this.draw(ctx);
    }

    setupGameControls(ctx){
        let playerRadius = this.player.radius;
        document.addEventListener('keydown', event => {
            if(event.keyCode == 37 && this.player.x > (20+playerRadius)) {
                this.player.left();
            }
            if(event.keyCode == 39 && this.player.x < (ctx.canvas.width-20-playerRadius)) {
                this.player.right();
            }
            if(event.keyCode == 40 && this.player.y < (ctx.canvas.height-20-playerRadius)){
                this.player.down();
            }
            if(event.keyCode == 38 && this.player.y > (20+playerRadius)){
                this.player.up();
            }
        });
        document.addEventListener("keyup", event =>{});
    }
}


