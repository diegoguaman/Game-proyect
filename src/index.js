window.addEventListener('load', () => {
    //conseguimos el nodo de la pantalla del juego
    //Este nombre es el que se va a pasar a todos los elementos con los que vamos a trabajar
    const windowGame = document.querySelector('.window-game');
    const buttonStart = document.querySelector('#start-button');
    const startContainer = document.querySelector('.start-container');
    const game = new Game (windowGame);
    buttonStart.addEventListener("click", () => {
        startContainer.remove();
        game.start();
    })
});