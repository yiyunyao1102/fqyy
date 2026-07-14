import Phaser from "phaser";
import type { ChoiceOption } from "../data/choices";

export class LevelUpPanel {
  private readonly container: Phaser.GameObjects.Container;
  private readonly title: Phaser.GameObjects.Text;
  private readonly subtitle: Phaser.GameObjects.Text;
  private readonly options: Array<{
    box: Phaser.GameObjects.Rectangle;
    label: Phaser.GameObjects.Text;
    desc: Phaser.GameObjects.Text;
  }> = [];
  private chooseHandler?: (option: ChoiceOption) => void;
  private currentOptions: ChoiceOption[] = [];

  constructor(scene: Phaser.Scene) {
    const backdrop = scene.add
      .rectangle(0, 0, scene.scale.width, scene.scale.height, 0x02070d, 0.78)
      .setOrigin(0)
      .setInteractive();

    const panel = scene.add
      .rectangle(scene.scale.width * 0.5, scene.scale.height * 0.5, 780, 360, 0x07111d, 0.97)
      .setStrokeStyle(3, 0x72ced7, 0.72);
    const panelInset = scene.add
      .rectangle(scene.scale.width * 0.5, scene.scale.height * 0.5, 756, 336)
      .setStrokeStyle(1, 0xd7b96d, 0.38);

    this.title = scene.add
      .text(scene.scale.width * 0.5, scene.scale.height * 0.5 - 144, "Breakthrough Choice", {
        fontFamily: "Trebuchet MS, Noto Sans SC, sans-serif",
        fontSize: "28px",
        color: "#f5e6a8"
      })
      .setOrigin(0.5);

    this.subtitle = scene.add
      .text(scene.scale.width * 0.5, scene.scale.height * 0.5 - 108, "", {
        fontFamily: "Trebuchet MS, Noto Sans SC, sans-serif",
        fontSize: "15px",
        color: "#9bc4d8",
        align: "center",
        wordWrap: { width: 700 }
      })
      .setOrigin(0.5);

    this.container = scene.add.container(0, 0, [
      backdrop,
      panel,
      panelInset,
      this.title,
      this.subtitle
    ]);
    this.container.setDepth(500).setVisible(false);

    for (let i = 0; i < 4; i += 1) {
      const x = scene.scale.width * 0.5 - 270 + i * 180;
      const y = scene.scale.height * 0.5 + 12;
      const box = scene.add
        .rectangle(x, y, 166, 180, 0x0d1d2b, 0.96)
        .setStrokeStyle(2, 0x6fcbd5, 0.7)
        .setInteractive({ useHandCursor: true });
      const label = scene.add
        .text(x, y - 52, "", {
          fontFamily: "Trebuchet MS, Noto Sans SC, sans-serif",
          fontSize: "20px",
          color: "#f5fbff",
          align: "center",
          wordWrap: { width: 146 }
        })
        .setOrigin(0.5);
      const desc = scene.add
        .text(x, y + 20, "", {
          fontFamily: "Trebuchet MS, Noto Sans SC, sans-serif",
          fontSize: "15px",
          color: "#a9c8da",
          align: "center",
          wordWrap: { width: 146 }
        })
        .setOrigin(0.5);

      box.on("pointerdown", () => {
        const option = this.currentOptions[i];
        if (option && this.chooseHandler) {
          this.chooseHandler(option);
        }
      });
      box.on("pointerover", () => {
        box.setFillStyle(0x163246, 0.98).setStrokeStyle(3, 0xd7b96d, 0.9);
      });
      box.on("pointerout", () => {
        box.setFillStyle(0x0d1d2b, 0.96).setStrokeStyle(2, 0x6fcbd5, 0.7);
      });

      this.container.add([box, label, desc]);
      this.options.push({ box, label, desc });
    }
  }

  show(
    title: string,
    subtitle: string | undefined,
    options: ChoiceOption[],
    onChoose: (option: ChoiceOption) => void
  ): void {
    this.currentOptions = options;
    this.chooseHandler = onChoose;
    this.title.setText(title);
    this.subtitle.setText(subtitle ?? "");
    this.container.setVisible(true);

    const spacing = options.length === 4 ? 180 : 220;
    const startX = this.title.x - ((options.length - 1) * spacing) / 2;

    options.forEach((option, index) => {
      const slot = this.options[index];
      const x = startX + index * spacing;
      slot.box.setX(x);
      slot.label.setX(x);
      slot.desc.setX(x);
      slot.label.setText(`${index + 1}. ${option.title}`);
      slot.desc.setText(option.description);
      slot.box.setVisible(true);
      slot.label.setVisible(true);
      slot.desc.setVisible(true);
    });

    for (let i = options.length; i < this.options.length; i += 1) {
      const slot = this.options[i];
      slot.box.setVisible(false);
      slot.label.setVisible(false);
      slot.desc.setVisible(false);
    }
  }

  hide(): void {
    this.currentOptions = [];
    this.chooseHandler = undefined;
    this.container.setVisible(false);
  }

  chooseAt(index: number): void {
    const option = this.currentOptions[index];
    if (option && this.chooseHandler) {
      this.chooseHandler(option);
    }
  }

  getSnapshot(): { visible: boolean; renderedOptionCount: number } {
    return {
      visible: this.container.visible,
      renderedOptionCount: this.options.filter((option) => option.box.visible).length
    };
  }
}
