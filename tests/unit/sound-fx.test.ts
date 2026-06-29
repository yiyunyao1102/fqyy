import { describe, expect, it } from "vitest";
import { SoundFx } from "../../src/audio/SoundFx";

describe("SoundFx", () => {
  it("is a silent no-op (never throws) when the Web Audio API is unavailable", () => {
    const sfx = new SoundFx();
    expect(() => {
      // Includes the throttled-hit path (two hits in quick succession).
      sfx.hit();
      sfx.hit();
      sfx.pickup();
      sfx.rankUp();
      sfx.breakthrough();
      sfx.death();
      sfx.evade();
    }).not.toThrow();
  });
});
