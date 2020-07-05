//Name:
//points break down:
//implement a simultaneous two-player mode (50) 
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)


// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Menu2, Menu3, Play, Player2],
}

// main game object
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyLEFT, keyRIGHT,keyF;
//Multiplayer keyboard vars
let keyD, keyA, keyW;

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}
