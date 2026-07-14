import Phaser from "phaser";
import { WORLD_TEXTURES } from "./worldVisuals";

export interface ArenaPresentation {
  floor: Phaser.GameObjects.TileSprite;
  decorationCount: number;
}

export function createArenaPresentation(
  scene: Phaser.Scene,
  width: number,
  height: number
): ArenaPresentation {
  scene.add.rectangle(0, 0, 6000, 6000, 0x03070d, 1).setOrigin(0.5).setDepth(-30);
  scene.add.rectangle(0, 0, width, height, 0x08111f, 1).setOrigin(0.5).setDepth(-23);

  const floor = scene.add
    .tileSprite(0, 0, width, height, WORLD_TEXTURES.arenaFloor)
    .setOrigin(0.5)
    .setDepth(-22)
    .setAlpha(0.82);
  floor.tileScaleX = 0.58;
  floor.tileScaleY = 0.58;

  const markings = scene.add.graphics().setDepth(-20);
  markings.lineStyle(1, 0x6ab6c9, 0.1);
  for (let x = -width / 2 + 256; x < width / 2; x += 256) {
    markings.lineBetween(x, -height / 2, x, height / 2);
  }
  for (let y = -height / 2 + 256; y < height / 2; y += 256) {
    markings.lineBetween(-width / 2, y, width / 2, y);
  }

  markings.lineStyle(3, 0x70d7df, 0.16);
  markings.strokeCircle(0, 0, 270);
  markings.lineStyle(2, 0xc9a95d, 0.14);
  markings.strokeCircle(0, 0, 185);
  markings.lineStyle(2, 0x70d7df, 0.12);
  for (let spoke = 0; spoke < 8; spoke += 1) {
    const angle = (Math.PI * 2 * spoke) / 8;
    markings.lineBetween(
      Math.cos(angle) * 188,
      Math.sin(angle) * 188,
      Math.cos(angle) * 264,
      Math.sin(angle) * 264
    );
    const tangent = angle + Math.PI / 2;
    const centerX = Math.cos(angle) * 225;
    const centerY = Math.sin(angle) * 225;
    for (const offset of [-9, 0, 9]) {
      markings.lineBetween(
        centerX + Math.cos(tangent) * -18 + Math.cos(angle) * offset,
        centerY + Math.sin(tangent) * -18 + Math.sin(angle) * offset,
        centerX + Math.cos(tangent) * 18 + Math.cos(angle) * offset,
        centerY + Math.sin(tangent) * 18 + Math.sin(angle) * offset
      );
    }
  }

  const inset = 92;
  const corners = [
    [-width / 2 + inset, -height / 2 + inset],
    [width / 2 - inset, -height / 2 + inset],
    [-width / 2 + inset, height / 2 - inset],
    [width / 2 - inset, height / 2 - inset]
  ] as const;
  corners.forEach(([x, y]) => {
    scene.add
      .rectangle(x, y, 62, 62, 0x102638, 0.78)
      .setRotation(Math.PI / 4)
      .setStrokeStyle(3, 0x77ced8, 0.38)
      .setDepth(-19);
    scene.add
      .circle(x, y, 13, 0xc8a45b, 0.12)
      .setStrokeStyle(2, 0xe2c471, 0.32)
      .setDepth(-18);
  });

  const boundary = scene.add.graphics().setDepth(-17);
  boundary.lineStyle(7, 0x07111d, 0.92);
  boundary.strokeRect(-width / 2, -height / 2, width, height);
  boundary.lineStyle(3, 0x68c5d1, 0.55);
  boundary.strokeRect(-width / 2 + 7, -height / 2 + 7, width - 14, height - 14);
  boundary.lineStyle(1, 0xd7bb70, 0.34);
  boundary.strokeRect(-width / 2 + 15, -height / 2 + 15, width - 30, height - 30);

  return { floor, decorationCount: 6 };
}
