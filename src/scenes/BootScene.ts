import Phaser from "phaser";
import { createGrayboxTextures } from "../utils/textureFactory";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  create(): void {
    createGrayboxTextures(this);
    this.scene.start("game");
    this.scene.start("ui");
  }
}
