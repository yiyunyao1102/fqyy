export interface WeaponConfig {
  id: string;
  name: string;
  projectileTexture: string;
  baseDamage: number;
  cooldownMs: number;
  projectileSpeed: number;
  projectileLifetimeMs: number;
  pierce: number;
  count: number;
}

export const baseFlyingSword: WeaponConfig = {
  id: "flying-sword",
  name: "Azure Flying Sword",
  projectileTexture: "flying-sword",
  baseDamage: 18,
  cooldownMs: 850,
  projectileSpeed: 420,
  projectileLifetimeMs: 1400,
  pierce: 1,
  count: 1
};
