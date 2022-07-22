const config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 720,
  backgroundColor: '#210238',
  scene: [StartScene, GameScene, EndScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      enableBody: true,
    }
  }
};

const game = new Phaser.Game(config);
