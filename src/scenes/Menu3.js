class Menu3 extends Phaser.Scene {
    constructor() {
        super("menu3Scene");
    }


    create() {
        this.title = this.add.sprite(0,0,'title2').setOrigin(0,0);
        // menu display 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            backgroundColor: '#F3B141',
            color: "#000",
            align: 'right',
            padding: {top: 5, bottom: 5,},
            fixedWidth: 0
        }
        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, ' SINGLE PLAYER MODE ', menuConfig).setOrigin (0.5);
        menuConfig.backgroundColor = "#0000FF";
        menuConfig.color = "#000";  
        menuConfig.fontSize = "20px";
        this.add.text(centerX, centerY, 'Use (←)(→) arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFD700';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);  
    
        // define keys
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
            this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
             game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}