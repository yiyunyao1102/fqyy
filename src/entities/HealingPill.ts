import Phaser from "phaser";
import { PICKUP_ANIMATIONS, WORLD_TEXTURES } from "../visual/worldVisuals";

export class HealingPill extends Phaser.Physics.Arcade.Sprite {
  healAmount: number;

  constructor(scene: Phaser.Scene, x: number, y: number, healAmount = 30) {
    super(scene, x, y, WORLD_TEXTURES.pickups, 4);
    this.healAmount = healAmount;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(4);
    this.setDisplaySize(34, 34);
    const radius = 7 / this.scaleX;
    this.setCircle(radius, 128 - radius, 128 - radius);
    this.play(PICKUP_ANIMATIONS.healingPill);
  }

  getVisualSnapshot(): { textureKey: string; animationKey: string } {
    return {
      textureKey: this.texture.key,
      animationKey: this.anims.currentAnim?.key ?? ""
    };
  }
}
