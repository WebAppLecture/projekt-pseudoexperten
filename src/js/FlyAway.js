
import { Ballon, MovableGameObject } from "./GameObject.js";

export class FlyAway{

    constructor(ctx){
        this.start();
        this.setupGameControls(ctx);
        //this.gameLoop();

        //enemies
        this.ticksToNextStone = 400;

        //enemies 1: destroys the ballon
        this.enemiesOne = [];

        //enemies 2: ballon grows 
        this.enemiesTwo =[];

    }

    start(){
        this.gameOver = false;
        this.points = 0;
        this.lives = 3;
        
        //player
        let sizePlayer = 30;
        this.player = new Ballon(300, 300, sizePlayer, 8);
    }

    /*gameLoop() {  
        if(this.game !== undefined) {
            requestAnimationFrame(this.gameLoop.bind(this));  
            this.renderContext.clearRect(0,0,this.screen.width, this.screen.height);
            this.game.tick(this.renderContext);
        }
    }*/

    tick(ctx) {
        if(this.gameOver) {
            this.gameOverScreen(ctx);
            return;
        }
        this.update(ctx);
        this.draw(ctx);
    }

    update(ctx){
        this.player.update(ctx);
        this.updateEnemies(ctx);
    }


    draw(ctx){
        this.player.draw(ctx);
        this.drawBoundingBox(ctx);
        this.enemiesOne.forEach(enemie => enemie.draw(ctx));
        this.enemiesTwo.forEach(enemie => enemie.draw(ctx));
    }

    drawBoundingBox(ctx) {
        ctx.strokeStyle = "#6bd26b";
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, ctx.canvas.width - 20, ctx.canvas.height - 20);
    }
 

    setupGameControls(ctx){
        document.addEventListener("keydown", this.onKeyInteraction.bind(this, true));
        document.addEventListener("keyup", this.onKeyInteraction.bind(this, false));
    }

    onKeyInteraction(bool, event){
        if(event.keyCode == 37){
            this.player.left(bool);
        }
        if(event.keyCode == 39){
            this.player.right(bool);
        }
        if(event.keyCode == 38){
            this.player.up(bool);
        }
        if(event.keyCode == 40){
            this.player.down(bool);
        }
    }

    createEnemies(ctx, enemieArray, color){
        let radius = 10;
        let varsToCreateEnemie = this.randomPosition(radius, ctx);
        
        enemieArray.push(new MovableGameObject(varsToCreateEnemie[0], varsToCreateEnemie[1], radius, color, 
            varsToCreateEnemie[2], varsToCreateEnemie[3]));
    }

    //returns: [positionX, positionY, speedX, speedY] for the enemie
    randomPosition(radius, ctx){
        var random_boolean = Math.random() >= 0.5;
        //on true: Enemie enters the canvas from the top
        if(random_boolean){
            return[Math.random() *(ctx.canvas.width - radius - 40) + 40, -radius, 0, Math.random() * (1.5-1) + 1];
        }
        //on false: enemie enters the canvas from the left
        else {
            return[-radius, Math.random() *(ctx.canvas.width - radius - 40) + 40, Math.random() * (1.5-1) + 1, 0];
        }
    }

    updateEnemies(ctx){ 
        //destroy enemies outside of canvas
        this.destroyEnemies(ctx, this.enemiesOne);
        this.destroyEnemies(ctx,this.enemiesTwo);

        this.enemiesOne.forEach(enemie => enemie.update(ctx));
        this.enemiesTwo.forEach(enemie => enemie.update(ctx));
        
        //TODO destroy on collision with canvas

        if(this.ticksToNextStone == 200){
            this.createEnemies(ctx, this.enemiesOne, "#B22222");
        } else if (this.ticksToNextStone == 400) {
            this.createEnemies(ctx, this.enemiesTwo, "#200000");
        }


        this.ticksToNextStone--;
        if(this.ticksToNextStone == 0){
            this.ticksToNextStone = 400;
        }
        
    }

    destroyEnemies(ctx, enemiesArray){
        for(let i = enemiesArray.length; i--;){
            if(enemiesArray[i].y >= ctx.canvas.height || enemiesArray[i].x >= ctx.canvas.width){
                enemiesArray.splice(i, 1);
            }
        }
    }
    
}


