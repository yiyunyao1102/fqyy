export type EnemyId = "jade-rat" | "mist-wolf" | "bone-crow";

export interface EnemyConfig {
  id: EnemyId;
  name: string;
  texture: string;
  maxHealth: number;
  speed: number;
  touchDamage: number;
  xpDrop: number;
  weight: number;
  tint: number;
  scale: number;
}

export const enemyConfigs: Record<EnemyId, EnemyConfig> = {
  "jade-rat": {
    id: "jade-rat",
    name: "Jade Burrow Rat",
    texture: "enemy-rat",
    maxHealth: 18,
    speed: 70,
    touchDamage: 8,
    xpDrop: 1,
    weight: 7,
    tint: 0x6cc17a,
    scale: 1
  },
  "mist-wolf": {
    id: "mist-wolf",
    name: "Mist Howler",
    texture: "enemy-wolf",
    maxHealth: 34,
    speed: 90,
    touchDamage: 12,
    xpDrop: 2,
    weight: 4,
    tint: 0x99d0ff,
    scale: 1.1
  },
  "bone-crow": {
    id: "bone-crow",
    name: "Bone Crow",
    texture: "enemy-crow",
    maxHealth: 24,
    speed: 120,
    touchDamage: 10,
    xpDrop: 2,
    weight: 3,
    tint: 0xe9e1ca,
    scale: 0.95
  }
};
