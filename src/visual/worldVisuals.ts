import Phaser from "phaser";
import pickupAtlasUrl from "../../assets/sprites/pickups/export/pickup-atlas.png";
import arenaFloorUrl from "../../assets/environment/export/arena-floor.png";
import type { SpiritTreasureId } from "../data/spiritTreasures";

export const WORLD_TEXTURES = {
  pickups: "pickup-atlas",
  arenaFloor: "arena-floor"
} as const;

export const PICKUP_ANIMATIONS = {
  qiOrb: "pickup-qi-orb-hover",
  healingPill: "pickup-healing-pill-hover",
  spiritTreasure: "pickup-spirit-treasure-hover",
  collect: "pickup-collect-burst"
} as const;

export const SPIRIT_TREASURE_TINTS: Record<SpiritTreasureId, number> = {
  "jade-heart-pendant": 0x78e0a4,
  "windstep-talisman": 0x82dcff,
  "lodestone-charm": 0xc79cff,
  "ironhide-seal": 0xe0a56f,
  "spiritbloom-vial": 0xff9dc9,
  "farsight-mirror": 0xe5efff
};

export const SPIRIT_TREASURE_COLLECTION_TINT = 0xd7b96d;

export function preloadWorldVisuals(scene: Phaser.Scene): void {
  scene.load.spritesheet(WORLD_TEXTURES.pickups, pickupAtlasUrl, {
    frameWidth: 256,
    frameHeight: 256
  });
  scene.load.image(WORLD_TEXTURES.arenaFloor, arenaFloorUrl);
}

export function createWorldAnimations(scene: Phaser.Scene): void {
  const create = (key: string, start: number, end: number, frameRate: number, repeat: number) => {
    if (scene.anims.exists(key)) return;
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers(WORLD_TEXTURES.pickups, { start, end }),
      frameRate,
      repeat
    });
  };

  create(PICKUP_ANIMATIONS.qiOrb, 0, 3, 8, -1);
  create(PICKUP_ANIMATIONS.healingPill, 4, 7, 7, -1);
  create(PICKUP_ANIMATIONS.spiritTreasure, 8, 11, 7, -1);
  create(PICKUP_ANIMATIONS.collect, 12, 15, 16, 0);
}
