class Background {
    constructor(windowGame){
        this.windowGame = windowGame;
        //this.width = this.windowGame.offsetWidth;
        this.width = 11500;
        this.height = this.windowGame.offsetHeight;
        //this.height = 352;

        this.x = 0;
        this.y = 0;

        this.vx = 0;

        this.element = document.createElement('div');


    }
    draw(){
        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/img/background.png)`;
        this.element.style.backgroundSize = "cover";
        //this.element.style.backgroundPosition = "center";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.bottom = this.y + "px";
        this.element.style.left = this.x + "px";

        this.windowGame.appendChild(this.element)
    }
    move(){
        this.x += this.vx;
    }
    update(speedPlayer){
        if (speedPlayer > 0) {
            this.vx = -(speedPlayer / 1.5);
        } else{
            this.vx = 0;
        }
        this.move();
        this.draw();
    }
}