export type UpgradeEffect =
  | "swordDamage"
  | "swordCooldown"
  | "swordCount"
  | "moveSpeed"
  | "maxHealth"
  | "heal"
  | "magnet";

export interface UpgradeConfig {
  id: string;
  name: string;
  lore: string;
  effect: UpgradeEffect;
  value: number;
}

export const upgradeConfigs: UpgradeConfig[] = [
  {
    id: "iron-sword-mantra",
    name: "Iron Sword Mantra",
    lore: "+6 flying sword damage.",
    effect: "swordDamage",
    value: 6
  },
  {
    id: "swift-cloud-steps",
    name: "Swift Cloud Steps",
    lore: "+24 move speed.",
    effect: "moveSpeed",
    value: 24
  },
  {
    id: "condensed-qi",
    name: "Condensed Qi",
    lore: "Flying swords attack 12% faster.",
    effect: "swordCooldown",
    value: 0.88
  },
  {
    id: "second-sword",
    name: "Twin Sword Intent",
    lore: "+1 sword per volley.",
    effect: "swordCount",
    value: 1
  },
  {
    id: "jade-meridian",
    name: "Jade Meridian",
    lore: "+20 maximum health.",
    effect: "maxHealth",
    value: 20
  },
  {
    id: "minor-pill",
    name: "Spirit Rejuvenation Pill",
    lore: "Recover 30 health now.",
    effect: "heal",
    value: 30
  },
  {
    id: "soul-lure-banner",
    name: "Soul Lure Banner",
    lore: "+28 orb pickup range.",
    effect: "magnet",
    value: 28
  }
];
