export type SpiritTreasureId =
  | "jade-heart-pendant"
  | "windstep-talisman"
  | "lodestone-charm"
  | "ironhide-seal"
  | "spiritbloom-vial"
  | "farsight-mirror";

export type SpiritTreasureEffectKind = "maxHealth" | "moveSpeed" | "magnetRadius" | "mitigation";

export interface SpiritTreasureConfig {
  id: SpiritTreasureId;
  name: string;
  lore: string;
  effect: SpiritTreasureEffectKind;
  value: number;
}

/** A cultivator can keep three active Spirit Treasures at once. */
export const MAX_SPIRIT_TREASURE_SLOTS = 3;

export const spiritTreasureConfigs: Record<SpiritTreasureId, SpiritTreasureConfig> = {
  "jade-heart-pendant": {
    id: "jade-heart-pendant",
    name: "Jade Heart Pendant",
    lore: "A cool jade warmth steadies the meridians, deepening vitality.",
    effect: "maxHealth",
    value: 30
  },
  "windstep-talisman": {
    id: "windstep-talisman",
    name: "Windstep Talisman",
    lore: "Footfalls lighten as if carried on a mountain breeze.",
    effect: "moveSpeed",
    value: 24
  },
  "lodestone-charm": {
    id: "lodestone-charm",
    name: "Lodestone Charm",
    lore: "Loose Qi drifts toward its bearer of its own accord.",
    effect: "magnetRadius",
    value: 48
  },
  "ironhide-seal": {
    id: "ironhide-seal",
    name: "Ironhide Seal",
    lore: "The skin tempers against blows like banded iron.",
    effect: "mitigation",
    value: 0.08
  },
  "spiritbloom-vial": {
    id: "spiritbloom-vial",
    name: "Spiritbloom Vial",
    lore: "A slow bloom of spirit essence fortifies the body.",
    effect: "maxHealth",
    value: 18
  },
  "farsight-mirror": {
    id: "farsight-mirror",
    name: "Farsight Mirror",
    lore: "Distant Qi glints in the glass and answers the call.",
    effect: "magnetRadius",
    value: 30
  }
};

export function getSpiritTreasureConfig(id: SpiritTreasureId): SpiritTreasureConfig {
  return spiritTreasureConfigs[id];
}
