import Phaser from "phaser";
import bgImg from "./assets/bg.png";
import spritesheet from "./assets/spritesheet.png";
import sprites from "./assets/sprites.json";
import { createAnim } from "./animationHelpers";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: true
    }
  },
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("bg", bgImg);
  // this.load.image("midTile", midTileImg);
  this.load.atlas("allImages", spritesheet, sprites);
}

function create() {
  this.add.image(400, 150, "bg");

  this.platform = this.add.tileSprite(
    400,
    500,
    600,
    100,
    "allImages",
    "tile-2"
  );

  createAnim(this.anims, "walk", "Walk (", ")", 10);
  createAnim(this.anims, "idle", "Idle (", ")", 10);
  createAnim(this.anims, "jump", "Jump (", ")", 10, 0);

  this.cat = this.add.sprite(200, 300, "allImages");
  this.cat.setOrigin(0.5);
  this.cat.play("idle");

  this.physics.world.enable([this.cat, this.platform]);
  this.cat.body.setBounce(0.2);

  this.platform.body.setImmovable().setAllowGravity(false);

  this.cursors = this.input.keyboard.createCursorKeys();

  this.cursors.up.on(
    "down",
    function(key, event) {
      this.cat.body.velocity.y = -200;
      if (this.cat.body.touching.down) {
        this.cat.play("jump");
      }
    },
    this
  );

  this.airbourne = false;
  this.walking = false;
  this.physics.add.collider(this.cat, this.platform);
}

function update() {
  const setGroundedAnim = () => {
    const walk = () => {
      if (!this.walking) {
        this.cat.play("walk");
        this.walking = true;
      }
    };

    if (this.cursors.left.isDown) {
      this.cat.body.velocity.x = -150;
      this.cat.setFlipX(true);
      walk();
    } else if (this.cursors.right.isDown) {
      this.cat.body.velocity.x = 150;
      this.cat.setFlipX(false);
      walk();
    } else {
      this.walking = false;
      this.cat.play("idle");
    }
  };

  if (this.cursors.left.isDown) {
    this.cat.body.velocity.x = -150;
    this.cat.setFlipX(true);
  } else if (this.cursors.right.isDown) {
    this.cat.body.velocity.x = 150;
    this.cat.setFlipX(false);
  }
  if (this.cat.body.touching.down) {
    this.cat.body.velocity.x = 0;
    setGroundedAnim();
  }
  if (this.cursors.down.isDown) {
    this.cat.body.velocity.y += 5;
  }
}
