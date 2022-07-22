//global variables
let score = 0;
let highscore = 0;
let life = 3;
const gameState = {
}
var platforms;
var gems;
var acceleration = 600;
var jumpVelocity = -330;
var lifeText;
var scoreText;



class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
  
    preload(){
        this.load.image('background', 'assets/background.png');
        this.load.image("hero","assets/hero.png");
        this.load.image("platform1","assets/platform1.png");
        this.load.image("platform2","assets/platform2.png");
        this.load.image("platform3","assets/platform3.png");
        this.load.image("platform4","assets/platform4.png");
    
        this.load.image("gem","assets/gem.png");

         
    }
    
    create(){
        this.add.image(540, 360, 'background')
        this.cameras.main.fadeIn(1000);
        gameState.hero = this.physics.add.sprite(150, 100, 'hero');
        gameState.hero.setBounce(0.2);
        //decelerates when no force applied(no key pressed)
        gameState.hero.allowDrag = true;
        gameState.hero.setDrag(300, 0);
        //set max velocity
        gameState.hero.setMaxVelocity(300,600)
    
        //add gems
        gems = this.physics.add.staticGroup();
        gems.create(50, 100, 'gem');
        gems.create(270, 450, 'gem');
        gems.create(90, 600, 'gem');
        gems.create(600, 400, 'gem');
        gems.create(720, 500, 'gem');
        gems.create(850, 300, 'gem');
        gems.create(740, 100, 'gem');
        gems.create(1050, 120, 'gem');
        this.physics.add.overlap(gameState.hero, gems, this.eatGem, null, this);

        //add grounds
        platforms = this.physics.add.staticGroup();
        platforms.create(300, 350, 'platform1');
        platforms.create(500, 260, 'platform3');
        platforms.create(50, 160, 'platform3');
        platforms.create(300, 200, 'platform4');
        platforms.create(50, 450, 'platform2');
        platforms.create(200, 570, 'platform2');
        platforms.create(100, 650, 'platform3');
        platforms.create(400, 500, 'platform4');
        platforms.create(600, 470, 'platform3');
        platforms.create(600, 150, 'platform2');
        platforms.create(720, 550, 'platform3');
        platforms.create(950, 600, 'platform2');
        platforms.create(1020,480, 'platform2');
        platforms.create(850, 350, 'platform4');
        platforms.create(1020, 180, 'platform1');
        this.physics.add.collider(gameState.hero, platforms);

        //hero can fall; but left and right sides are closed
        this.physics.world.setBounds(0, 0, 1080, 720, true, true, true, false)
        gameState.hero.body.collideWorldBounds = true;

        //show score counts on top left
        score = 0;
        scoreText = this.add.text(850, 30, `Score: ${score}`, {
            fontSize: '25px',
            fontStyle: 'bold',
            fill: '#ffffff'
          });

        //show life counts on top left
        life = 3;
        lifeText = this.add.text(30, 30, `Life: ${life}`, {
            fontSize: '25px',
            fontStyle: 'bold',
            fill: '#ffffff'
          });

        
        //add listener
        gameState.cursors = this.input.keyboard.createCursorKeys();
        
        
    }

    update(){
        //character movement:
        var standing = gameState.hero.body.blocked.down || gameState.hero.body.touching.down;
        if (gameState.cursors.right.isDown) {
            if (standing) {
                gameState.hero.setAccelerationX(acceleration / 2);
            }
            //if hero is in the air then accelerate slower
            else {
                gameState.hero.setAccelerationX(acceleration / 2.5);
            }
          }
        else if (gameState.cursors.left.isDown) {
            if (standing) {
                gameState.hero.setAccelerationX(-acceleration /2);
            }
            else {
                //slow down speed if no force is applied
                gameState.hero.setAccelerationX(-acceleration / 2.5);
            }
          }
        else
          {
            gameState.hero.setAccelerationX(0);
          }
        if (gameState.cursors.space.isDown && standing) {
            gameState.hero.setVelocityY(-400);
          }

        if (score == 80 && life >0){
            gameState.hero.destroy();
            this.scene.stop('GameScene');
            this.scene.start('EndScene');
        }
        //if character falls out of the screen
        if (gameState.hero.y>720){
            
          if(life>1){
          life --;
          lifeText.setText(`Life: ${life}`);
          gameState.hero.setPosition(150,0);
            }
          else{
          gameState.hero.destroy();
          this.scene.stop('GameScene');
          this.scene.start('EndScene');
            }
            
        }
        

    }

eatGem (hero, gem){
    gem.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
}


  endGame() {
    // Stop sprites moving
    this.physics.pause();
    // Transition to end scene w/fade
    this.cameras.main.fade(400, 0, 0, 0, false, function(camera, progress) {
      if (progress > 0.5) {
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
      }
    });
  } 

   
    
}
