class Bullet {
    constructor(windowGame, width, height, x, y, borderBullet, vx, vy = 0, color){
        this.windowGame = windowGame;
        this.width = width;
        this.height = height;
        this.borderBullet = borderBullet;
        this.color = color;

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        

        this.element = document.createElement('div');


    }
    draw(){
        this.element.style.position = "absolute";
        this.element.style.bottom = this.y + "px";
        this.element.style.left = this.x + "px";

        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.background = this.color;
        //this.element.style.borderRadius = "0 3px 3px 0";
        this.element.style.borderRadius = this.borderBullet;

        this.windowGame.appendChild(this.element);
    }
    move(){
        this.x += this.vx;
        this.y += this.vy;
        
    }
    update(){
        this.move();
        this.draw();
    }
}