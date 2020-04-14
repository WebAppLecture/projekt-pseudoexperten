export class GameObject{

    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

export class MovableGameObject extends GameObject {

    constructor(x, y, width, height, color, vx, vy) {
        super(x, y, width, height, color);
        this.vx = vx;
        this.vy = vy;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

export class Ballon extends MovableGameObject {

    constructor(x, y, width, height, deltaV) {
       //hier kann Farbe geändert werden
        super(x, y, width, height, "#909090", 0, 0);
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