import Phaser from "phaser";

export function createGrayboxTextures(scene: Phaser.Scene): void {
  const graphics = scene.add.graphics();

  graphics.fillStyle(0x9bd3ff);
  graphics.fillCircle(16, 16, 14);
  graphics.generateTexture("player-cultivator", 32, 32);
  graphics.clear();

  graphics.fillStyle(0x77ffcc);
  graphics.fillTriangle(4, 16, 28, 10, 28, 22);
  graphics.generateTexture("flying-sword", 32, 32);
  graphics.clear();

  graphics.fillStyle(0x7df9ff);
  graphics.fillCircle(8, 8, 8);
  graphics.generateTexture("xp-orb", 16, 16);
  graphics.clear();

  graphics.fillStyle(0x6cc17a);
  graphics.fillRoundedRect(0, 4, 28, 20, 7);
  graphics.generateTexture("enemy-rat", 28, 28);
  graphics.clear();

  graphics.fillStyle(0x99d0ff);
  graphics.fillRoundedRect(0, 0, 36, 22, 7);
  graphics.generateTexture("enemy-wolf", 36, 22);
  graphics.clear();

  graphics.fillStyle(0xe9e1ca);
  graphics.fillTriangle(0, 18, 18, 0, 36, 18);
  graphics.generateTexture("enemy-crow", 36, 18);
  graphics.clear();

  graphics.fillStyle(0x24313d, 0.9);
  graphics.fillRoundedRect(0, 0, 360, 200, 16);
  graphics.generateTexture("panel", 360, 200);
  graphics.destroy();
}
