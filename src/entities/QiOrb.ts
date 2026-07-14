import Phaser from "phaser";
import { PICKUP_ANIMATIONS, WORLD_TEXTURES } from "../visual/worldVisuals";

export class QiOrb extends Phaser.Physics.Arcade.Sprite {
  qiValue: number;

  constructor(scene: Phaser.Scene, x: number, y: number, qiValue: number) {
    super(scene, x, y, WORLD_TEXTURES.pickups, 0);
    this.qiValue = qiValue;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(4);
    this.setDisplaySize(28, 28);
    const radius = 6 / this.scaleX;
    this.setCircle(radius, 128 - radius, 128 - radius);
    this.play(PICKUP_ANIMATIONS.qiOrb);
  }

  getVisualSnapshot(): { textureKey: string; animationKey: string } {
    return {
      textureKey: this.texture.key,
      animationKey: this.anims.currentAnim?.key ?? ""
    };
  }
}
