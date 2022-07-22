class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  preload() {
    this.load.image('endScreen', 'assets/endscreen.png');
  }

  create() {
    // fade in
    this.cameras.main.fadeIn(6000);
    // Set end screen image
    this.add.image(0, 0, 'endScreen').setOrigin(0);
    
    // Display score of completed game
    if (score > highscore){
      highscore = score;
    }
    else{}
    if (score ==80){
    this.add.text(50, 300, `You collected all the gems!`, {
      fontSize: '25px',
      fontStyle: 'bold',
      fill: '#ffffff'
    });
  }

    // Display the total score
    const highscoreText = this.add.text(100, 100, `Highest Record: ${highscore}`, {
      fontSize: '30px',
      fontStyle: 'bold',
      fill: '#fffd80'
    });
    //score text on top of the background
    highscoreText.setDepth(1);

    const endscoreText = this.add.text(100, 180, `Score: ${score}`, {
      fontSize: '45px',
      fontStyle: 'bold',
      fill: '#ffffff'
    });
    // Sets the z-index: Put the text on top of the background and any other images
    scoreText.setDepth(1);
    // Clicks to restart
    this.input.on('pointerup', () => {
      this.scene.stop('EndScene');
      this.scene.start('GameScene');
    });
  }
}
