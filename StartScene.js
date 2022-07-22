class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('startScreen', 'assets/start.png');
  }

  create() {
    //Add endscreen
    screen = this.add.image(0, 0, 'startScreen').setOrigin(0);
    //Click to Start
    this.input.on('pointerup', () => {
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}
