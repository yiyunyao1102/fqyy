import Phaser from "phaser";
import type { UpgradeConfig } from "../data/upgrades";

export class LevelUpPanel {
  private readonly container: Phaser.GameObjects.Container;
  private readonly title: Phaser.GameObjects.Text;
  private readonly options: Array<{
    box: Phaser.GameObjects.Rectangle;
    label: Phaser.GameObjects.Text;
    desc: Phaser.GameObjects.Text;
  }> = [];
  private chooseHandler?: (upgrade: UpgradeConfig) => void;
  private currentOptions: UpgradeConfig[] = [];

  constructor(scene: Phaser.Scene) {
    const backdrop = scene.add
      .rectangle(0, 0, scene.scale.width, scene.scale.height, 0x02070d, 0.78)
      .setOrigin(0)
      .setInteractive();

    const panel = scene.add.image(scene.scale.width * 0.5, scene.scale.height * 0.5, "panel");
    panel.setDisplaySize(780, 360);

    this.title = scene.add
      .text(scene.scale.width * 0.5, scene.scale.height * 0.5 - 132, "Breakthrough Choice", {
        fontFamily: "Trebuchet MS, Noto Sans SC, sans-serif",
        fontSize: "28px",
        color: "#f5e6a8"
      })
      .setOrigin(0.5);

    this.container = scene.add.container(0, 0, [backdrop, panel, this.title]);
    this.container.setDepth(500).setVisible(false);

    for (let i = 0; i < 3; i += 1) {
      const x = scene.scale.width * 0.5 - 235 + i * 235;
      const y = scene.scale.height * 0.5 + 12;
      const box = scene.add
        .rectangle(x, y, 200, 180, 0x102131, 0.95)
        .setStrokeStyle(2, 0x5fe0ff)
        .setInteractive({ useHandCursor: true });
      const label = scene.add
        .text(x, y - 52, "", {
          fontFamily: "Trebuchet MS, Noto Sans SC, sans-serif",
          fontSize: "20px",
          color: "#f5fbff",
          align: "center",
          wordWrap: { width: 170 }
        })
        .setOrigin(0.5);
      const desc = scene.add
        .text(x, y + 20, "", {
          fontFamily: "Trebuchet MS, Noto Sans SC, sans-serif",
          fontSize: "15px",
          color: "#a9c8da",
          align: "center",
          wordWrap: { width: 170 }
        })
        .setOrigin(0.5);

      box.on("pointerdown", () => {
        const upgrade = this.currentOptions[i];
        if (upgrade && this.chooseHandler) {
          this.chooseHandler(upgrade);
        }
      });

      this.container.add([box, label, desc]);
      this.options.push({ box, label, desc });
    }
  }

  show(options: UpgradeConfig[], onChoose: (upgrade: UpgradeConfig) => void): void {
    this.currentOptions = options;
    this.chooseHandler = onChoose;
    this.container.setVisible(true);

    options.forEach((upgrade, index) => {
      const slot = this.options[index];
      slot.label.setText(`${index + 1}. ${upgrade.name}`);
      slot.desc.setText(upgrade.lore);
      slot.box.setVisible(true);
      slot.label.setVisible(true);
      slot.desc.setVisible(true);
    });
  }

  hide(): void {
    this.currentOptions = [];
    this.chooseHandler = undefined;
    this.container.setVisible(false);
  }

  chooseAt(index: number): void {
    const upgrade = this.currentOptions[index];
    if (upgrade && this.chooseHandler) {
      this.chooseHandler(upgrade);
    }
  }
}
