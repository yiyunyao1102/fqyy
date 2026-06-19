import type { EnemyId } from "./enemies";

export interface WaveSpawn {
  at: number;
  pool: EnemyId[];
  intervalMs: number;
  amount: number;
}

export const waveDurationMs = 6 * 60 * 1000;

export const waveSpawns: WaveSpawn[] = [
  {
    at: 0,
    pool: ["jade-rat"],
    intervalMs: 1500,
    amount: 2
  },
  {
    at: 45_000,
    pool: ["jade-rat", "mist-wolf"],
    intervalMs: 1200,
    amount: 3
  },
  {
    at: 95_000,
    pool: ["mist-wolf", "bone-crow"],
    intervalMs: 1050,
    amount: 4
  },
  {
    at: 160_000,
    pool: ["jade-rat", "mist-wolf", "bone-crow"],
    intervalMs: 900,
    amount: 5
  }
];
