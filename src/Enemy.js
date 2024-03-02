class Enemy {
  constructor(windowGame, x, y) {
    this.windowGame = windowGame;
    this.width = 170;
    this.height = 130;
    this.color = "black";

    //this.x = this.windowGame.offsetWidth;
    this.x = x;
    this.y = y;

    this.vx = 0;

    this.xBullet = this.x;
    this.vxBullet = -15;
    this.vyBullet = 0;

    //Array de balas para que dispare
    this.bullets = [];

    this.element = document.createElement("div");
    this.element.style.background = `url(./assets/img/enemy.png)`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "-40px";
    this.element.style.backgroundRepeat = "no-repeat";

    this.element.style.position = "absolute";
  }
  draw() {
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    //this.element.style.border = "solid 1px black"

    this.element.style.bottom = this.y + "px";
    this.element.style.left = this.x + "px";

    this.windowGame.appendChild(this.element);
  }
  move() {
    this.x += this.vx;
    this.xBullet += this.vx;
  }
  shoot(xPlayer, yPlayer) {
    if (xPlayer > this.x + this.width) {
      this.xBullet = this.x + this.width;
      this.vxBullet = 15;
    }

    if (yPlayer > this.y) {
      this.vyBullet = 2;
    } else if (yPlayer < this.y) {
      this.vyBullet = -2;
    }
    console.log(this.yPlayer, this.y);


    setTimeout(() => {
      if (this.element.style.display !== "none") {
        
        this.bullets.push(
          new Bullet(
            this.windowGame,
            10,
            7,
            this.xBullet,
            this.y + this.height / 1.7,
            "4px 0 0 4px",
            this.vxBullet,
            this.vyBullet
          )
        );
      }
    }, 140);
  }
  cleanup() {
    this.bullets.forEach((bullet) => {
      //Compruebo que esten dentro del windowGame
      const inBoard = bullet.x + bullet.width < this.windowGame.offsetWidth;
      if (!inBoard) {
        bullet.element.remove();
      }
    });
    const filteredBullets = this.bullets.filter((bullet) => {
      return bullet.x + bullet.width < this.windowGame.offsetWidth;
    });
    this.bullets = filteredBullets;
  }
  update(speedPlayer) {
    if (speedPlayer > 0) {
      this.vx = -speedPlayer;
    } else {
      this.vx = 0;
    }
    this.move();
    this.draw();

    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  }
  didCollide(obstacle) {
    const obstacleRect = obstacle.element.getBoundingClientRect();
    const enemyRect = this.element.getBoundingClientRect();

    if (
      enemyRect.left < obstacleRect.right &&
      enemyRect.right > obstacleRect.left &&
      enemyRect.top < obstacleRect.bottom &&
      enemyRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
