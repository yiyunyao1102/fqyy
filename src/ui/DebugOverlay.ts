import Phaser from "phaser";

export class DebugOverlay {
  private readonly text: Phaser.GameObjects.Text;
  visible = false;

  constructor(scene: Phaser.Scene) {
    this.text = scene.add
      .text(18, 188, "", {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#d8f3ff",
        backgroundColor: "rgba(3, 13, 23, 0.7)",
        padding: {
          x: 10,
          y: 8
        }
      })
      .setScrollFactor(0)
      .setDepth(200)
      .setVisible(false);
  }

  toggle(): void {
    this.visible = !this.visible;
    this.text.setVisible(this.visible);
  }

  render(lines: string[]): void {
    if (!this.visible) {
      return;
    }
    this.text.setText(lines);
  }
}
