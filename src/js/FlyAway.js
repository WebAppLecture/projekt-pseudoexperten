
import { Ballon, MovableGameObject } from "./GameObject.js";

export class FlyAway{

    constructor(ctx){
        this.start();
        this.setupGameControls(ctx);
        //this.gameLoop();

        //enemies
        this.ticksToNextStone = 400;

        //enemies 1: destroys the ballon
        this.arrayOfEnemiesOne = [];

        //enemies 2: ballon grows 
        this.arrayOfEnemiesTwo = [];

        //coins
        this.arrayOfCoins = [];

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
        this.checkCollisionOfEnemies(ctx);
        this.update(ctx);
        this.draw(ctx);
    }

    update(ctx){
        this.player.update(ctx);
        this.updateEnemies(ctx);
    }

    draw(ctx){
        this.createEnemies(ctx);
        this.player.draw(ctx);
        this.drawBoundingBox(ctx);
        this.arrayOfEnemiesOne.forEach(enemie => enemie.draw(ctx));
        this.arrayOfEnemiesTwo.forEach(enemie => enemie.draw(ctx));
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


    /*       ENEMIES           */
    createEnemies(ctx){
        if(this.ticksToNextStone == 200){
            this.createDifferentEnemies(ctx, this.arrayOfEnemiesOne, "#B22222");
        } else if (this.ticksToNextStone == 400) {
            this.createDifferentEnemies(ctx, this.arrayOfEnemiesTwo, "#200000");
        } 

        this.ticksToNextStone--;
        if(this.ticksToNextStone == 0){
            this.ticksToNextStone = 400;
        }    
    }

    createDifferentEnemies(ctx, arrayOfEnemies, color){
        let radius = 10;
        let varsToCreateEnemie = this.randomPosition(radius, ctx);
        
        arrayOfEnemies.push(new MovableGameObject(varsToCreateEnemie[0], varsToCreateEnemie[1], radius, color, 
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
        this.arrayOfEnemiesOne.forEach(enemie => enemie.update(ctx));
        this.arrayOfEnemiesTwo.forEach(enemie => enemie.update(ctx));
    }

    checkCollisionOfEnemies(ctx){
        this.checkCollisionForDifferentEnemieTypes(ctx, this.arrayOfEnemiesOne, "grow");
        this.checkCollisionForDifferentEnemieTypes(ctx,this.arrayOfEnemiesTwo, "gameOver");
    }

    checkCollisionForDifferentEnemieTypes(ctx, arrayOfEnemies, stringForActionOnCollision){
        for(let i = arrayOfEnemies.length; i--;){
            if(this.collisionWithCanvas(ctx, arrayOfEnemies[i])){
                arrayOfEnemies.splice(i, 1);
            }
            if(this.collisionWithPlayer(arrayOfEnemies[i])){
                arrayOfEnemies.splice(i, 1);
                this.actionOnCollision(stringForActionOnCollision);
            }
        }
    }

    actionOnCollision(stringForActionOnCollision){
        if(stringForActionOnCollision == "grow"){
            this.player.resizePlayer();
        } else if (stringForActionOnCollision == "gameOver"){
            this.gameOver = true;

            this.gameOverText = ["Test", "du hast verloren"];
        }
    }

    collisionWithPlayer(enemie){
        return (this.player.collision(enemie.x, enemie.y, enemie.radius));
    }

    collisionWithCanvas(ctx, enemie){
        return (enemie.y >= ctx.canvas.height || enemie.x >= ctx.canvas.width);
    }

    /* Game Over Screen funktioniert, aber nur für eine millisekunde? */
    gameOverScreen(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        this.gameOverText.forEach((line, i) => {
            ctx.fillText(line, ctx.canvas.width / 2, ctx.canvas.height / 2 + i * 30);
            ctx.strokeText(line, ctx.canvas.width / 2, ctx.canvas.height / 2 + i * 30);
        });
    }

    /*       COINS        */
    createCoins(ctx, arrayOfCoins) {
        let radius = 10;
        let color = "#E2B007";
        let varsToCreateCoins = this.randomPositionCoins(radius, ctx);
        
        arrayOfCoins.push(new MovableGameObject(varsToCreateCoins[0], varsToCreateCoins[1], radius, color));
    }


    randomPositionCoins(radius, ctx) {
        return[Math.random() * (ctx.canvas.width), -radius, 0, Math.random() * (1.5-1) + 1];
    }

}
