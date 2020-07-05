//TWO PLAYER MODE Menu
class Menu2 extends Phaser.Scene {
    constructor() {
        super("menu2Scene");
    }

    create(){
        this.title2 = this.add.sprite(0,0,'title2').setOrigin(0,0);
        //menu screen 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            backgroundColor: '#F3B141',
            color: "#000",
            align: 'right',
            padding: {top: 5, bottom: 5,},
            fixedWidth: 0
        }

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - (textSpacer + 96), ' TWO PLAYERS MODE ', menuConfig).setOrigin (0.5);
              
        menuConfig.backgroundColor = "#0000FF";
        menuConfig.color = "#000";  
        menuConfig.fontSize = "20px";

        this.add.text(centerX, centerY - (textSpacer + 32), ' Player 1: ', menuConfig).setOrigin (0.5);
        this.add.text(centerX, centerY - textSpacer, ' Use (A) and (D) to Move & ', menuConfig).setOrigin (0.5);
        this.add.text(centerX, centerY - 32, ' (W) to Fire ', menuConfig).setOrigin (0.5);
        this.add.text(centerX, centerY + 32, ' Player 2: ', menuConfig).setOrigin (0.5);
        this.add.text(centerX, centerY + textSpacer, ' Use (←)(→) Arrows to Move & ', menuConfig).setOrigin (0.5);
        this.add.text(centerX, centerY + textSpacer + 32, ' (↑) Arrow to Fire ', menuConfig).setOrigin (0.5);
        
        menuConfig.backgroundColor = "#FFD700";
        menuConfig.color = "#000";        
        this.add.text(centerX, centerY + (textSpacer * 2 + 32), ' PRESS ← for EASY or → for HARD ', menuConfig).setOrigin (0.5);

        //define play mode/level difficulty keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("2playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
             game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("2playScene");    
        }
    }
}