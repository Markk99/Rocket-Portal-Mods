//Two players mode
class Player2 extends Phaser.Scene {
    constructor() {
        super("2playScene");
    }

    preload() {
        //load bgm
        this.load.audio('bgm', './assets/bgm.wav'); //http://www.aigei.com/music/class/rpg_marker/?order=last&page=2
        //load image/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/monster.png');
        this.load.image('starfield', './assets/background.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 20}); //https://www.subpng.com/png-1mtyxe/
        }
    
    create() {
         //create background music
         this.backgroundMusic = this.sound.add('bgm',{mute: false, volume: 0.5, rate: 1,loop: true });
         this.backgroundMusic.play();
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        //white retangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFAFA).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFAFA).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFAFA).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFAFA).setOrigin(0, 0);
        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x000000).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket1(this, game.config.width/2 + 100, 424, 'rocket').setOrigin(0,0);
        //add fish(p2)
        this.p2Rocket = new Rocket2(this, game.config.width/2 - 100, 424, 'rocket').setOrigin(0,0);
        //add spaceships(x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30, false).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20, false).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10, false).setOrigin(0,0);
        
        //define keys for Player 1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); //single player mode
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
        
        //define keys for Player 2
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            framerate: 30,
        });

        //score - intialized at 0pts
        this.p1Score = 0;
        this.p2Score = 0; //Player 2 score

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#843605",
            align: 'right',
            padding: {top: 5, bottom: 5,},
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(469, 54, this.p1Score, scoreConfig);    
        this.scoreRight = this.add.text(69, 54, this.p2Score, scoreConfig); 

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
            this.scene.restart(this.p2Score);
            this.backgroundMusic.stop();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.backgroundMusic.stop();
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
        // check collisions
        if(!this.ship03.isCollided && this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.sound.play('sfx_explosion');
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
        }
        if (!this.ship02.isCollided && this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.sound.play('sfx_explosion');
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
        }
        if (!this.ship01.isCollided && this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.sound.play('sfx_explosion');
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;
        }
        // check collisions-player2
        if(!this.ship03.isCollided && this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
            this.sound.play('sfxexplosion2');
            this.p2Score += this.ship03.points;
            this.scoreRight.text = this.p2Score;
        }
        if (!this.ship02.isCollided && this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
            this.sound.play('sfxexplosion2');
            this.p2Score += this.ship02.points;
            this.scoreRight.text = this.p2Score;
        }
        if (!this.ship01.isCollided && this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
            this.sound.play('sfxexplosion2');
            this.p2Score += this.ship01.points;
            this.scoreRight.text = this.p2Score;
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                ship.isCollided = true;  //fish has been collided
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x-9, ship.y+7, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        //this.p1Score += ship.points;
        //this.scoreLeft.text = this.p1Score;     
        // play sound
        //this.sound.play('sfx_explosion');  
    }
}

