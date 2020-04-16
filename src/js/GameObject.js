export class GameObject{

    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;  
        this.radius = radius;
        this.color = color;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(context) {
        //Kreis
        context.beginPath();
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

//brauchen wir eventuell fürs Spielfeld
/*export class StrokedObject extends MovableGameObject {

    constructor(x, y, width, height, color, lineWidth) {
        super(x, y, 0, color);
        //für Viereck:
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
    }

    draw(ctx) {
        //Viereck
        /* ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(
            this.x + this.lineWidth/2, 
            this.y + this.lineWidth/2, 
            this.width - this.lineWidth, 
            this.height - this.lineWidth);
    }
}*/

export class Ballon extends MovableGameObject {

    constructor(x, y, radius, deltaV) {
       //hier kann die Farbe geändert werden
        super(x, y, radius, "#909090", 0, 0);
        this.deltaV = deltaV;
        
    }

    up(bool) {
        this.vy = bool * -this.deltaV;
    }

    down(bool) {
        this.vy = bool * this.deltaV;
    }

    left(bool) {
        this.vx = bool * -this.deltaV;   
    }

    right(bool) {
        this.vx = bool * this.deltaV;
    }

    update(ctx) {
        if(this.vy === 0 && this.vx === 0) {
            //return; 
        }
        //keeps player inside the box
        if(this.y < 40) { //up
            this.y = 40;
        } 
        if(this.y + this.radius + 10 > ctx.canvas.height) { //down
            this.y = ctx.canvas.height - this.radius - 10;
        }
        if(this.x < 40) { //left
            this.x = 40;
        } 
        if(this.x + this. radius + 10 > ctx.canvas.width) {//right
            this.x = ctx.canvas.width - this.radius - 10;
        }
        super.update();
    }

    resizePlayer(){
        this.radius += 4;
    }

    collision( otherObjectX, otherObjectY, otherObjectRadius){
        let xDif = this.x - otherObjectX,
            yDif = this.y - otherObjectY,
            distanceSquared = (xDif * xDif) + (yDif * yDif);
        return (distanceSquared < (this.radius + otherObjectRadius) * (this.radius + otherObjectRadius));
    }

}