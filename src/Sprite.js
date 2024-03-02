class Sprite {
    constructor(windowGame){
        this.windowGame = windowGame;        
        this.x;
        this.y;
        this.xFrames = 4;
        this.yFrames = 4;
        this.frameX = 0;
        this.frameY = 0;
        this.img = new Image();
        this.img.src = "./assets/img/atack.png";
        this.isImageReady = false;  
        this.img.onload = () => {
          this.width = this.img.width / this.xFrames;
          this.height = this.img.height / this.yFrames;

          this.sprite = document.createElement('div');
          this.sprite.style.position = "absolute";
          this.sprite.style.width = `${this.width}px`;
          this.sprite.style.height = `${this.height}px`
          this.sprite.style.background = `url(./assets/img/atack.png)`;

          this.isImageReady = true;
        }

        this.tick = 0;
    }
    draw(){
        if (this.isImageReady) {
          this.windowGame.appendChild(this.sprite);
          this.drawSprite();

          if (this.tick % 5 === 0) {
            if (this.frameX < this.xFrames - 1) {
              this.frameX++;
            } else {
              this.frameX = 0;
            }
            this.tick = 0;
          }

          this.tick++;
        }
    }
    drawSprite(){
        this.x = this.frameX * this.width;
        this.y = this.frameY * this.height;
        this.sprite.style.backgroundPosition = `${this.x}px ${this.y}px`;
    }
}