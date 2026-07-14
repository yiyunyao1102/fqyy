import Phaser from "phaser";
import type { SpiritTreasureId } from "../data/spiritTreasures";
import {
  PICKUP_ANIMATIONS,
  SPIRIT_TREASURE_TINTS,
  WORLD_TEXTURES
} from "../visual/worldVisuals";

export class SpiritTreasure extends Phaser.Physics.Arcade.Sprite {
  treasureId: SpiritTreasureId;

  constructor(scene: Phaser.Scene, x: number, y: number, treasureId: SpiritTreasureId) {
    super(scene, x, y, WORLD_TEXTURES.pickups, 8);
    this.treasureId = treasureId;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(4);
    this.setDisplaySize(40, 40);
    const radius = 9 / this.scaleX;
    this.setCircle(radius, 128 - radius, 128 - radius);
    this.setTint(SPIRIT_TREASURE_TINTS[treasureId]);
    this.play(PICKUP_ANIMATIONS.spiritTreasure);
  }

  getVisualSnapshot(): {
    treasureId: SpiritTreasureId;
    textureKey: string;
    animationKey: string;
    tint: number;
  } {
    return {
      treasureId: this.treasureId,
      textureKey: this.texture.key,
      animationKey: this.anims.currentAnim?.key ?? "",
      tint: this.tintTopLeft
    };
  }
}
