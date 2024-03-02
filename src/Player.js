class Player {
  constructor(windowGame) {
    this.windowGame = windowGame;

    this.width = 80;
    this.height = 100;
    this.color = "rgb(33, 185, 185)";
    this.lives = 3;

    this.x = 20;
    this.previousX = this.x;
    this.floorFixedY = 20;
    this.floor = this.floorFixedY;
    this.y = 20;
    this.previousY = this.y;
    this.playerCanCollide = true;
    this.playerCanCollideX = true;

    this.vx = 0;
    this.vy = 0;

    this.imageMotionShoot = false;
    this.imageMotionShootLeft = false;
    this.imageMotionShootUp = false;
    this.shootRight = false;
    this.shootLeft = false;
    this.shootUp = false;
    this.xBullet = this.x + this.width;
    this.yBullet = this.y + this.height;
    this.vxBullet = 15;
    this.vyBullet = 0;
    this.borderBullet = "0 4px 4px 0";

    //saltar usa la gravedad y un booleano para saber si estas altando o no
    // para no dejar que saltes varias veces(flupybird)
    this.isJumping = false;
    this.g = -1.5;

    this.bullets = [];
    //creamos una booleano para dar tiempo entre disparano y disparo
    this.shootCoolDown = false;

    this.spriteImages = [
      "./assets/img/sprite1.png",
      "./assets/img/sprite2.png",
      "./assets/img/sprite3.png",
      "./assets/img/sprite4.png"
    ]
    this.tickFrame = 0;
    this.currentFrame = 0;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.setListener();
  }
  drawBack(){
    
  }
  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.bottom = this.y + "px";
    this.element.style.left = this.x + "px";
    /*setInterval(() => {
      this.tickFrame++;
      if (this.tickFrame % 900 === 0) {
        this.currentFrame = (this.currentFrame + 1) % this.spriteImages.length;   
      }
    }, 10);*/
    
    if (this.imageMotionShoot && this.shootRight) {
      this.element.style.backgroundImage = `url('./assets/img/shoot-right.png')`;  
    } else if (this.imageMotionShootLeft && this.shootLeft) {
      this.element.style.backgroundImage = `url('./assets/img/shoot-left.png')`;  
    } else if (this.imageMotionShootUp && this.shootUp) {
      this.element.style.backgroundImage = `url('./assets/img/shoot-up.png')`;
    }
    else{
      //this.element.style.backgroundImage = `url('${this.spriteImages[this.currentFrame]}')`;
      this.element.style.backgroundImage = `url('./assets/img/shoot-right.png')`; 
    }
    
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundSize = "cover";

    this.windowGame.appendChild(this.element);
  }

  move() {
    this.x += this.vx;
    this.xBullet += this.vx;
    if (this.isJumping) {
      this.vy += this.g;
    }

    this.previousY = this.y;
    this.y += this.vy;
    this.yBullet += this.vy;
    //limitaciones
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x >= this.windowGame.offsetWidth / 1.75 - this.width) {
      this.x = this.windowGame.offsetWidth / 1.75 - this.width;
    }
    if (this.y >= this.windowGame.offsetHeight - this.height) {
      this.y = this.windowGame.offsetHeight - this.height;
    }

    //para que te deje volver a saltar
    //this.y <= this.floor le da el limite del cual no debe pasar
    //al usar bottom tiene que ser menor porque se acerca a cero
    if (this.y < this.floor) {
      this.isJumping = false;
      this.y = this.floor - 1;
    }
    if (this.yBullet < this.floor) {
      this.isJumping = false;
      this.yBullet = this.floor;
    }
  }

  shoot() {
    if (this.shootRight) {
      this.xBullet = this.x + this.width;
      this.yBullet = this.y + this.height / 1.55;
      this.vxBullet = 15;
      this.vyBullet = 0;
    } else if (this.shootLeft) {
      this.xBullet = this.x;
      this.yBullet = this.y + this.height / 1.55;
      this.vxBullet = -15;
      this.vyBullet = 0;
      this.borderBullet = "4px 0 0 4px";
    } else if (this.shootUp) {
      this.xBullet = this.x + this.width / 4;
      this.yBullet = this.y + this.height;
      this.vxBullet = 0;
      this.vyBullet = 15;
      this.borderBullet = "4px 4px 0 0";
    } else{
      this.xBullet = this.x + this.width;
      this.yBullet = this.y + this.height / 1.55;
      this.vxBullet = 15;
      this.vyBullet = 0;
    }

    if (!this.shootCoolDown) {
      this.bullets.push(
        new Bullet(
          this.windowGame,
          10,
          7,
          this.xBullet,
          this.yBullet,
          this.borderBullet,
          this.vxBullet,
          this.vyBullet
        )
      );
      this.shootCoolDown = true;
      setTimeout(() => {
        this.shootCoolDown = false;
      }, 150);
    }
  }
  
  cleanup() {
    this.bullets.forEach((bullet) => {
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

  setListener() {
    window.addEventListener("keydown", (e) => {
      //console.log(e);
      switch (e.code) {
        case "KeyD":
          if (!this.playerCanCollideX) {
            this.vx = 0;
          } else {
            this.vx = 10;
          }
          this.shootRight = true;
          this.imageMotionShootLeft = false;

          break;
        case "KeyA": 
          this.vx = -10;
          this.shootRight = false;
          this.shootLeft = true;
          this.imageMotionShootLeft = true;
          break;

        //saltar
        case "Space":
          if (!this.isJumping) {
            this.y = this.floor + 25;
            this.isJumping = true;
            this.vy = 20;
          }
          this.playerCanCollide = true;
          break;

        case "KeyJ":
          //this.imageMotionShoot = true;
          this.shoot();
          break;
        case "KeyW":
          this.shootLeft = false;
          this.shootRight = false;
          this.imageMotionShootUp = true;
          this.shootUp = true;
          break;
        case "KeyS":
          this.height = this.height / 2;
          this.playerCanCollide = false;
          this.floor = this.floorFixedY;
          /*setTimeout(() => {
            this.playerCanCollide = true;
          }, 100);*/
          /*if (this.playerCanCollide) {
            this.playerCanCollide = false;
          }else{
            this.playerCanCollide = true;
          }*/
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyD":
        case "KeyA":
          this.vx = 0;

          break;
        case "KeyJ":
          this.imageMotionShoot = false;
          break;
        case "KeyS":
          this.height = this.height * 2;
          break;
        case "KeyW":
          this.shootUp = false;
          break;
      }
    });
  }
  update() {
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
