# Build-Identity Audit

_Question: do the 13 Gongfa actually play differently, or do they collapse into
the same feel?_

## Method

Static enumeration of every Gongfa's base (rank-0) combat signature from
`src/data/gongfa.ts`, cross-referenced with the passive archetypes in
`src/logic/gongfaRuntime.ts` and `src/data/surgeGongfa.ts`.

## The data — rank-0 combat signatures

| Gongfa | Pattern | dmg | cd | count | spread | range | aura | Passive |
|---|---|---|---|---|---|---|---|---|
| Yujian Jue | homing | 15 | 850 | 1 | 6 | 0 | 0 | **Intent** (unique) |
| Crimson Furnace Sword Art | homing | 14 | 880 | 2 | 8 | 52 | 0 | **Heat/Pressure/Ember** (unique) |
| Blazing Feather Art | homing | 14 | 820 | 1 | 10 | 0 | 0 | Surge (Scorch) |
| Drifting Frost Needle | homing | 13 | 800 | 1 | 10 | 0 | 0 | Surge (Frost) |
| Green Vine Art | homing | 12 | 840 | 1 | 10 | 0 | 0 | Surge (Vinegrowth) |
| Jinfeng Gong | wave | 20 | 880 | 2 | 18 | 140 | 0 | **Momentum** (unique) |
| Scarlet Wave Manual | wave | 19 | 860 | 2 | 20 | 150 | 0 | Surge (Tide) |
| Black Tide Scripture | wave | 18 | 900 | 2 | 20 | 150 | 0 | Surge (Tide) |
| Ironwood Wave Form | wave | 17 | 910 | 2 | 20 | 145 | 0 | Surge (Heartwood) |
| Gengjin Huti | aura | 9 | 1000 | 6 | 360 | 0 | 92 | **Guard** (unique) |
| Burning Ring Scripture | aura | 8 | 980 | 6 | 360 | 0 | 90 | Surge (Scorch) |
| Ice Mirror Guard | aura | 8 | 980 | 6 | 360 | 0 | 94 | Surge (Reflection) |
| Verdant Ring Scripture | aura | 8 | 1000 | 6 | 360 | 0 | 96 | Surge (Bloom) |

## Verdict

**The roster is three archetypes wearing thirteen costumes.** There are only
three base firing patterns (homing / wave / aura), and within each pattern the
"lighter" Surge Gongfa are numerically near-clones — they differ by ±1-2 damage,
±40ms cooldown, a renamed resource, and nothing else at rank 0. A player who
picks Blazing Feather vs Drifting Frost vs Green Vine in the opening is making a
**cosmetic** choice: identical homing darts, identical Surge build-up (a resource
that maxes at 6, boosts the skill, and adds projectiles), identical numbers.

Real build identity exists, but it is **back-loaded**:

1. **Three defining Gongfa diverge immediately** — Yujian (Intent on hits),
   Jinfeng (Momentum on movement), Gengjin (Guard mitigation). These play
   distinctly from turn one.
2. **The rank 3 / 6 / 9 transformations** reshape each Gongfa and are where the
   seven Surge Gongfa finally separate from one another.
3. Everything before the first transformation is pattern + flavor.

## Recommendation (a design decision for the owner)

The cheapest meaningful fix is to **differentiate the seven Surge Gongfa by
texture at rank 0**, so the opening choice matters before transformations land.
Three non-exclusive options:

- **Stat-profile divergence** (cheap, no new code): re-tune each Surge Gongfa
  to a distinct shape — e.g. one homing-Surge is fast/light/many-shot, another
  slow/heavy/piercing, another mid-range with spread. Same mechanic, different
  feel.
- **Per-resource behavior** (medium): give each Surge resource a small unique
  rider instead of a pure damage+projectile boost — Frost slows, Bloom heals,
  Tide pierces, Scorch burns-over-time. This is the strongest identity win.
- **Pull one transformation earlier** (medium): expose a signature behavior at
  rank 1 rather than rank 3 so identity lands during the first stage.

Until one of these is taken, treat early-game Gongfa choice as flavor and lean
on the three defining Gongfa + transformations to carry build diversity.
