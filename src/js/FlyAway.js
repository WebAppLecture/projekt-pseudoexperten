
import { GameObject, Ballon, MovableGameObject } from "./GameObject.js";

export class FlyAway{

    constructor(ctx){
        //enemies
        this.ticksToNextStone = 400;

        //enemies 1: destroys the ballon
        this.arrayOfEnemiesOne = [];

        //enemies 2: ballon grows 
        this.arrayOfEnemiesTwo = [];

        //coins
        this.arrayOfCoins = [];
        this.countCoins = 0;
        this.start(ctx);
        this.setupGameControls(ctx);
    }

    start(ctx){
        this.gameOver = false;
        this.points = 0;
        this.lives = 3;
        
        //player
        let sizePlayer = 20;
        this.player = new Ballon(300, 300, sizePlayer, 8);
        this.createCoins(ctx);
    }

    tick(ctx) {
        if(this.gameOver) {
            this.gameOverScreen(ctx);
            return;
        }
        if(this.countCoins == 10){
            this.gameWinningScreen(ctx);
            return;
        }
        this.checkCollision(ctx);
        this.create(ctx);
        this.update(ctx);
        this.draw(ctx);
    }

    checkCollision(ctx){
        this.checkCollisionOfEnemies(ctx);
        this.checkCollisionOfCoins();
    }

    create(ctx){
        this.createEnemies(ctx);
    }

    update(ctx){
        this.player.update(ctx);
        this.updateEnemies(ctx);
    }

    draw(ctx){
        this.player.draw(ctx);
        this.drawBoundingBox(ctx);
        this.arrayOfEnemiesOne.forEach(enemie => enemie.draw(ctx));
        this.arrayOfEnemiesTwo.forEach(enemie => enemie.draw(ctx));
        this.arrayOfCoins.forEach(coin => coin.draw(ctx));
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

            this.gameOverText = ["You failed, but never give up!", "Try again! :)"];
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
            ctx.fillText(line, ctx.canvas.width / 2, ctx.canvas.height / 2 + i * 50);
            ctx.strokeText(line, ctx.canvas.width / 2, ctx.canvas.height / 2 + i * 50);
        });
    }

    /*      COINS       */
    createCoins(ctx){
        for(let i = 10; i--; ){
            this.createNewCoin(ctx, this.arrayOfCoins, "#FFFF00");
        }
    }

    createNewCoin(ctx, arrayOfCoins, color){
        let radius = 6;
        let varsToCreateCoins = this.randomPositionCoins(ctx);
        arrayOfCoins.push(new GameObject(varsToCreateCoins[0], varsToCreateCoins[1], radius, color));
    }

    randomPositionCoins(ctx) {
        return[Math.random() * (ctx.canvas.width-50) + 40, Math.random() * (ctx.canvas.height-50) + 40];
    }

    checkCollisionOfCoins(){
        for(let i = this.arrayOfCoins.length; i--; ){     
            if(this.player.collision(this.arrayOfCoins[i].x, this.arrayOfCoins[i].y, this.arrayOfCoins[i].radius)){
                this.arrayOfCoins.splice(i, 1);
                this.countCoins += 1;
                if(this.countCoins == 10){
                    /*console.log("Funktioniert")*/
                    this.gameWinningText = ["You did it.", "Congratulations!"];
                }
            }
        }
    }

    gameWinningScreen(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        this.gameWinningText.forEach((line, i) => {
            ctx.fillText(line, ctx.canvas.width / 2, ctx.canvas.height / 2 + i * 50);
            ctx.strokeText(line, ctx.canvas.width / 2, ctx.canvas.height / 2 + i * 50);
        });
    }
}
