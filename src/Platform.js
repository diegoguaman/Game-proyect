class Platform {
    constructor(windowGame, width, height, x, y, color){
        this.windowGame = windowGame;
        this.width = width;
        this.height = height;
        this.color = color;

        this.x = x;
        this.y = y;
        this.vx = 0;

        this.element = document.createElement('div');
        this.element.style.position = "absolute";
    }
    draw(){
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.bottom = this.y + "px";
        this.element.style.left = this.x + "px";
        this.element.style.background = this.color;

        this.windowGame.appendChild(this.element);
    }
    move(){
        this.x += this.vx;
    }
    update(speedPlayer){
        if (speedPlayer > 0) {
            this.vx = -speedPlayer;
        } else {
            this.vx = 0;
        }        
    }
    didCollide(obstacle){
        const obstacleRect = obstacle.element.getBoundingClientRect();
        const platformRect = this.element.getBoundingClientRect();

        if (
            platformRect.left < obstacleRect.right &&
            platformRect.right > obstacleRect.left &&
            platformRect.top < obstacleRect.bottom &&
            platformRect.bottom > obstacleRect.top
        ) {
            return true;
        } else {
            return false;
        }
    }
}
