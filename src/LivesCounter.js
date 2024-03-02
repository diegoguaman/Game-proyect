class LivesCounter {
    constructor(windowGame, lives){
        this.windowGame = windowGame;
        this.lives = lives;

        this.element = document.createElement('div');
        this.element.style.position = "absolute";
        this.element.style.color = "white";
        this.element.style.fontSize = "20px";
        this.element.style.fontFamily = "Arial";
        this.element.style.fontWeight = "bold";
        this.element.style.left = "30px";
        this.element.style. top = "20px";
    }
    draw(){
        this.element.textContent = `Lives ${this.lives}`;
        this.windowGame.appendChild(this.element);
    }
    update(){
        this.draw();
    }
}