import Phaser from "phaser";

export class XPOrb extends Phaser.Physics.Arcade.Image {
  xpValue: number;

  constructor(scene: Phaser.Scene, x: number, y: number, xpValue: number) {
    super(scene, x, y, "xp-orb");
    this.xpValue = xpValue;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(4);
    this.setCircle(6);
  }
}
