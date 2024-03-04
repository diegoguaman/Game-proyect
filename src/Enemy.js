class Enemy {
  constructor(windowGame, x, y, vx) {
    this.windowGame = windowGame;
    this.width = 150;
    this.height = 130;
    this.color = "black";

    //this.x = this.windowGame.offsetWidth;
    this.x = x;
    this.y = y;

    this.vx = 0 || vx;

    this.xBullet = this.x;
    this.vxBullet = -20;
    this.vyBullet = 0;
    this.shootReverse = false;

    //Array de balas para que dispare
    this.bullets = [];

    this.element = document.createElement("div");

    this.element.style.position = "absolute";
  }
  draw() {
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    //this.element.style.border = "solid 1px black"
    this.element.style.bottom = this.y + "px";
    this.element.style.left = this.x + "px";
    if (this.shootReverse) {
      this.element.style.background = `url(./assets/img/enemy-reverse.png)`;
    } else {
      this.element.style.background = `url(./assets/img/enemy.png)`;
    }
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundRepeat = "no-repeat";
    this.windowGame.appendChild(this.element);
  }
  move() {
    if (this.vx !== 0) {  
      this.x += this.vx;
    }
    this.xBullet += this.vx;
  }
  shoot(xPlayer, yPlayer) {
    if (xPlayer > this.x + this.width / 2) {
      this.shootReverse = true;
      this.xBullet = this.x + this.width;
      this.vxBullet = 15;
    } else {
      this.shootReverse = false;
      this.xBullet = this.x;
      this.vxBullet = -15;
    }
    if (yPlayer > this.y) {
      this.vyBullet = 2;
    } else if (yPlayer < this.y) {
      this.vyBullet = -2;
    } else {
      this.vyBullet = 0;
    }
    

    setTimeout(() => {
      if (this.element.style.display !== "none") {
        this.bullets.push(
          new Bullet(
            this.windowGame,
            10,
            10,
            this.xBullet,
            this.y + this.height / 1.7,
            "5px 5px",
            this.vxBullet,
            this.vyBullet,
            "#DDA748"
          )
        );
      }
    }, 100);
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
      this.vx = -(speedPlayer / 1.5);
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
