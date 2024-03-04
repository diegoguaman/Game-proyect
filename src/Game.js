class Game {
  constructor(windowGame) {
    this.windowGame = windowGame;
    this.player = new Player(this.windowGame);
    this.background = new Background(this.windowGame);
    this.livesCounter = new LivesCounter(this.windowGame, this.player.lives);
    this.platforms = [
      new Platform(this.windowGame, this.background.width, 30, 0, 80),
    ];
    this.platformsStatic = [
      new Platform(this.windowGame, 200, 100, 600, 110, "black"),
    ];
    this.enemies = [
      new Enemy(this.windowGame, 900, 109),
      new Enemy(this.windowGame, 1200, 19),
      new Enemy(this.windowGame, 1500, 109),
      new Enemy(this.windowGame, 1800, 19),
      new Enemy(this.windowGame, 2100, 109),
      new Enemy(this.windowGame, 2400, 19),
      new Enemy(this.windowGame, 2700, 260),
      new Enemy(this.windowGame, 3000, 260),
      new Enemy(this.windowGame, 3300, 109),
      new Enemy(this.windowGame, 3300, 19)
    ];
    //this.sprite = new Sprite(this.windowGame);
    this.tickShootEnemy = 0;
    this.tickShootEnemyFrequency = 30;
    this.audio = document.querySelector("#music");
  }
  start() {
    this.audio.play();
    this.player.start();
    this.intervalId = setInterval(() => {
      
      this.tickShootEnemy++;
      if (this.tickShootEnemy % this.tickShootEnemyFrequency === 0) {
        this.enemies.forEach((enemy) => {
          if (enemy.x < this.windowGame.offsetWidth) {
            enemy.shoot(this.player.x, this.player.y);
          }
          
        });
      }
      this.update();
      this.move();
      this.checkColitions();
      this.draw();
      this.cleanup();
    }, 1000 / 36);
  }

  continue() {
    const continueWindowContainer = document.createElement("div");
    continueWindowContainer.classList.add("continue");

    const textContinueWindow = document.createElement("h1");
    textContinueWindow.textContent = "CONTINUE?";

    const butttonContainer = document.createElement("div");
    butttonContainer.classList.add("button-container");

    const buttonYes = document.createElement("button");
    buttonYes.classList.add("button-yes");
    const textButtonYes = document.createElement("h2");
    textButtonYes.textContent = "YES";
    buttonYes.addEventListener("click", () => {
      this.player.lives = 3;
      this.livesCounter.lives = 3;
      this.start();
    });

    const buttonNo = document.createElement("button");
    buttonNo.classList.add("button-no");
    const textButtonNo = document.createElement("h2");
    textButtonNo.textContent = "NO";

    buttonNo.addEventListener("click", () => {
      continueWindowContainer.style.display = "none";
      this.gameOver();
    });

    continueWindowContainer.appendChild(textContinueWindow);
    continueWindowContainer.appendChild(butttonContainer);
    butttonContainer.appendChild(buttonYes);
    buttonYes.appendChild(textButtonYes);
    buttonNo.appendChild(textButtonNo);
    butttonContainer.appendChild(buttonNo);
    this.windowGame.appendChild(continueWindowContainer);
  }
  gameOver() {
    const gameOverWindowContainer = document.createElement("div");
    gameOverWindowContainer.classList.add("game-over");
    this.windowGame.appendChild(gameOverWindowContainer);
  }
  win(){
    const winContainer = document.createElement("div");
    winContainer.classList.add("win");
    const wintText = document.createElement("h1");
    wintText.textContent = "MISION COMPLETE";
    winContainer.appendChild(wintText);
    this.windowGame.appendChild(winContainer);
  }
  checkColitions() {
    this.platforms.forEach((platform) => {
      const didCollide = platform.didCollide(this.player);

      if (
        didCollide &&
        this.player.previousY > this.player.y &&
        this.player.playerCanCollide
      ) {
        this.player.floor = platform.y + platform.height;
        this.player.y = this.player.floor - 1;
      }

      if (!didCollide && this.player.floor !== this.player.floorFixedY) {
        this.player.floor = this.player.floorFixedY;
      }
    });

    /*this.platformsStatic.forEach((platform) => {
      const didCollide = platform.didCollide(this.player);

      if (
        didCollide &&
        this.player.previousY > this.player.y &&
        this.player.playerCanCollide
      ) {
        this.player.floor = platform.y + platform.height;
        this.player.y = this.player.floor - 1;
      }

      if (!didCollide && this.player.floor !== this.player.floorFixedY) {
        //this.player.floor = this.player.floorFixedY;
      }
    });

    const wallCollied = this.platformsStatic.find((platform) => {
      return platform.didCollide(this.player);
    });

    if (
      wallCollied &&
      this.player.y < this.platformsStatic.y + this.platformsStatic.height
    ) {
      this.player.playerCanCollideX = false;
      this.player.vx = 0;
      this.player.x = wallCollied.x - this.player.width;
    } else {
      this.player.playerCanCollideX = true;
    }*/

    //balas jugador colisionan con enemy
    this.enemies.find((enemy) => {
      return this.player.bullets.find((bullet) => {
        if (enemy.didCollide(bullet)) {
          this.enemies = this.enemies.filter((enemyFromArr) => {
            return enemy !== enemyFromArr;
          });
          enemy.element.style.display = "none";
          if (this.enemies.length === 0) {
            window.clearInterval(this.intervalId);
            this.audio.pause();
            setTimeout(() => {
              this.win();
            }, 100);
          }
          this.player.bullets = this.player.bullets.filter((bulletsFromArr) => {
            return bullet !== bulletsFromArr;
          });
          bullet.element.style.display = "none";
        }
      });
    });

    //balas de enemy colisionan con player
    this.enemies.find((enemy) => {
      return enemy.bullets.find((bullet) => {
        if (this.player.didCollide(bullet)) {
          const newBullets = enemy.bullets.filter(
            (enemBullet) => enemBullet !== bullet
          );
          enemy.bullets = newBullets;

          //aqui es donde van las vidas
          this.player.lives--;
          this.livesCounter.lives--;
          if (this.player.lives === 0) {
            this.update();
            window.clearInterval(this.intervalId);
            this.audio.pause();
            this.player.stop();
            setTimeout(() => {
              this.continue();
            }, 100);
          }
        }
      });
    });
  }

  cleanup() {
    this.enemies.forEach((enemy) => {
      enemy.cleanup();
    });
    this.player.cleanup();
  }
  update() {
    this.background.update(this.player.vx);
    this.livesCounter.update();

    this.platforms.forEach((platform) => {
      platform.update(this.player.vx);
    });
    /*this.platformsStatic.forEach((platform) => {
      platform.update(this.player.vx);
    });*/

    this.player.update();

    this.enemies.forEach((enemy) => {
      enemy.update(this.player.vx);
    });
  }
  move() {
    this.platforms.forEach((platform) => {
      platform.move();
    });

    /*this.platformsStatic.forEach((platform) => {
      platform.move();
    });*/
    this.player.move();
  }
  draw() {
    this.platforms.forEach((platform) => {
      platform.draw();
    });
    /*this.platformsStatic.forEach((platform) => {
      platform.draw();
    });*/
    this.player.draw();

    //this.sprite.draw();
  }
}
