# Remaining Visual Pass Specification

Status: production target for the pickup, arena, and HUD pass.
Style basis: [`PLAYER_VISUAL_SPEC.md`](PLAYER_VISUAL_SPEC.md) and [`ENEMY_PROJECTILE_VISUAL_SPEC.md`](ENEMY_PROJECTILE_VISUAL_SPEC.md).

## Shared direction

The remaining graybox presentation uses FQYY's original hand-painted ink-and-watercolor language. World art stays darker and quieter than actors; pickups use compact luminous silhouettes; interface framing uses translucent ink panels, jade/cyan rules, warm gold milestones, and the existing readable sans-serif typography.

Painted bounds never define physics. Existing pickup radii, magnet behavior, healing rules, Spirit Treasure capacity/replacement rules, arena bounds, camera behavior, choice controls, and HUD information remain unchanged.

## 1. Qi Orb

The Qi Orb is a four-frame breathing-light loop: a pale cyan core wrapped by an irregular blue-white ink corona. It displays at 28 px, hovers through apparent lift authored inside its padded frames, remains readable over the arena, and keeps the existing six-pixel collision radius. Collection creates a four-frame inward breath burst above the Cultivator before the sprite is destroyed.

## 2. Healing Pill and Spirit Treasure pickups

The Healing Pill is a four-frame rose-and-ivory ceramic pill/vial loop, displayed at 34 px with the existing seven-pixel collision radius. Collection creates the same burst family tinted rose.

The Spirit Treasure is a four-frame gold-edged jade charm loop, displayed at 40 px with the existing nine-pixel collision radius. Six configured Treasure identities retain one shared readable silhouette but receive stable identity colors:

- Jade Heart Pendant — jade green;
- Windstep Talisman — sky cyan;
- Lodestone Charm — violet;
- Ironhide Seal — warm bronze;
- Spiritbloom Vial — blossom rose;
- Farsight Mirror — moon silver.

Stored and replaced Treasures create a gold-tinted collection burst. A Treasure awaiting a replace-or-leave choice remains visible and animated.

## 3. Arena and environment

The arena becomes a dark, hand-painted cultivation platform: layered indigo stone/ink wash, restrained cracks and mineral fibers, and subtle cyan spatial lines. A large low-contrast Bagua/cultivation seal centers the battlefield; four corner talisman stones and a double cyan boundary make world bounds legible. Decorations remain below actors and never affect collision or navigation.

The floor texture tiles without an obvious focal object or bright hotspot. The arena remains quieter than the Cultivator, enemies, projectiles, and pickups.

## 4. HUD and combat readability

The HUD becomes three scan regions without removing existing information:

1. top-left status panel: Vitality bar, Stage/Realm Phase, Qi, and Linggen;
2. top-right Gongfa panel: Gongfa, Mastery, active signature resource, and Spirit Treasures;
3. compact bottom-left action badge: Evade readiness/cooldown.

Messages remain centered near the bottom, pause/input guidance remains top-center, and choice panels use matching ink/jade framing. Low Vitality changes the bar and frame toward cinnabar; breakthrough-ready Qi uses warm gold. Debug text remains developer-only.

## Production assets

- `pickup-atlas.png`: 4 × 4 sheet, 256 × 256 RGBA cells.
  - row 1: Qi Orb hover;
  - row 2: Healing Pill hover;
  - row 3: Spirit Treasure hover;
  - row 4: shared collection breath burst.
- `arena-floor.png`: 1024 × 1024 opaque repeatable floor texture with no labels or gameplay objects.

Untouched generations and exact prompts live under each category's `raw_ai/` folder. Normalized production files live under `export/`.

## Acceptance

- Qi Orb, Healing Pill, and all six Spirit Treasure identities use the production pickup atlas in the running browser game; no pickup graybox body is visible.
- Hover loops, authored lift, identity tint, and collection bursts are observable while pickup gameplay remains unchanged.
- The production arena floor, central seal, corner stones, and boundary are visible at gameplay scale without reducing actor contrast or changing world bounds.
- The HUD visibly uses the three-region hierarchy, low-Vitality and breakthrough-ready emphasis, matching choice framing, and preserves all existing information and controls.
- The pickup atlas is transparent, padded, free of key-color fringe, and every frame is non-empty. The floor is opaque and registered in the production build.
- Browser captures prove all four parts at gameplay scale.
- Typecheck, lint, unit tests, production build, and the complete browser suite pass.
