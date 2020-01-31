import Phaser from "phaser";

export class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene) {
    super(scene);
    this.scene = scene;
    this.world = world;
    this.addPlatforms();
  }

  addPlatforms() {
    this.addMultiple([
      this.scene.add.tileSprite(400, 550, 600, 100, "allImages", "tile-2"),
      this.scene.add.tileSprite(100, 300, 200, 100, "allImages", "tile-2"),
      this.scene.add.tileSprite(700, 250, 300, 100, "allImages", "tile-2")
    ]);
  }
}
