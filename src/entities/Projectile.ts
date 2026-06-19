import Phaser from "phaser";

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  damage = 0;
  pierceRemaining = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(8);
  }
}
