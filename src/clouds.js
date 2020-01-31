import Phaser from "phaser";

export class Clouds extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.addClouds();
  }

  addClouds() {
    this.addMultiple([this.createCloud(100), this.createCloud(130, 5000)]);
  }

  createCloud(y, delay = 1000) {
    const cloud = this.scene.add.sprite(-300, y, "allImages", "cloud");
    this.scene.tweens.add({
      targets: cloud,
      x: 1100,
      duration: 12000,
      delay,
      repeat: -1
    });
    return cloud;
  }
}
