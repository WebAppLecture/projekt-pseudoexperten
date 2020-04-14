export class GameObject{

    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        
        this.radius = radius
        //für Viereck:
        /*this.width = width;
        this.height = height;*/
        this.color = color
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(context) {
        //Viereck
        /*ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;*/
        //Kreis
        context.arc(this.x,this.y, this.radius, 0, 2 *Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        //Rand Kreis
        context.lineWidth = 1.5;
        context.strokeStyle = '#003300';
        context.stroke();     
    }
}

export class MovableGameObject extends GameObject {

    constructor(x, y, radius, color, vx, vy) {
        super(x, y, radius, color);
        this.vx = vx;
        this.vy = vy;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

export class Ballon extends MovableGameObject {

    constructor(x, y, radius, deltaV) {
       //hier kann Farbe geändert
        super(x, y, radius, "#909090", 0, 0);
        this.deltaV = deltaV;
    }

    up(bool) {    
        this.vy = bool - this.deltaV; 
    }

    down(bool) {
        this.vy = bool + this.deltaV;
    }

    left(bool) {    
        this.vx = bool - this.deltaV; 
    }

    right(bool) {
        this.vx = bool + this.speed;
    }
    
    borderCollision(ctx) {
        let collisions =  [];
        if(this.y < 0) { // Top border
            this.y = 0;
            this.vy = -this.vy;
            collisions.push(Ball.COLLISIONS.UP);
        } 
        if(this.y + this.height > ctx.canvas.height) { // bottom border
            this.y = ctx.canvas.height - this.height;
            this.vy = -this.vy;
            collisions.push(Ball.COLLISIONS.DOWN);
        }
        if(this.x < 0) { // left border
            this.x = 0;
            this.vx = -this.vx;
            collisions.push(Ball.COLLISIONS.LEFT);
        } 
        if(this.x + this.width > ctx.canvas.width) { // right border
            this.x = ctx.canvas.width - this.width;
            this.vx = -this.vx;
            collisions.push(Ball.COLLISIONS.RIGHT);
        }
        return collisions.length === 0 ? false : collisions;
    }

    static get COLLISIONS() {
        return {
            LEFT: "LEFT",
            RIGHT: "RIGHT",
            UP: "UP",
            DOWN: "DOWN",
        }
    }

}