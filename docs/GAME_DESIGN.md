# FQYY Game Design

## Elevator Pitch

`FQYY` is a 2D action roguelite with a xiuxian cultivation theme. The player survives escalating monster waves while refining their build through sect techniques, spirit treasures, and breakthrough choices. The target feel is "Vampire Survivors pressure with cultivation progression and readable martial-fantasy spectacle."

## Design Pillars

1. Cultivation growth must feel dramatic.
   The player should begin fragile and end a run clearing dense enemy packs with visible mastery spikes.
2. Builds should express schools of cultivation, not generic stat piles.
   Upgrades should naturally group into sword intent, body refinement, talisman control, spirit beast contracts, and elemental arts.
3. Combat readability matters more than ornament.
   Enemy shapes, projectiles, pickups, danger zones, and elite attacks must stay legible during heavy screen pressure.
4. Runs should produce regular decision points.
   The player should get meaningful build choices often enough to steer a run, not just receive passive numerical growth.

## Target Run Structure

- Session length: 12 to 18 minutes for a standard run
- Current MVP length: 6 minutes
- Long-term structure:
  - Early game: establish one primary damage engine and one survival layer
  - Mid game: branch into synergy packages and manage denser enemy behaviors
  - Late game: survive elite pressure, complete a major breakthrough, and defeat a boss or final calamity

## Core Gameplay Loop

1. Move through the arena and avoid contact pressure.
2. Auto-attack through the active cultivation kit.
3. Collect dropped qi orbs.
4. Level up and choose one of three upgrades.
5. Reach timed breakthrough events, elite fights, and boss phases.
6. Convert run rewards into longer-term unlocks between runs.

## Combat Model

### Player Baseline

- Movement-driven survival
- Auto-attacking starter weapon
- Health and recovery as scarce resources
- Pickup magnet as an important comfort stat

### Weapon Families

These should become the main build identity layer.

- Sword Intent
  Orbiting swords, volleys, piercing blades, returning blades, execution bursts
- Talisman Arts
  Delayed seals, chained explosions, area denial, curse application
- Five Elements
  Fire damage-over-time, ice slows, thunder chains, earth barriers, wood sustain
- Body Cultivation
  Ram attacks, retaliation bursts, defensive scaling, close-range dominance
- Spirit Contracts
  Summoned beasts with autonomous attack patterns and support effects

### Support Systems

- Defensive tools: shields, damage reduction windows, brief invulnerability triggers
- Mobility tools: dash, mist step, blink talismans, move-speed spikes
- Economy tools: larger pickup radius, bonus qi, rerolls, fate manipulation
- Control tools: slows, knockback, charm, curse zones, pull effects

## Progression Structure

### In-Run Progression

- Standard level-up choices every time the XP threshold is reached
- Major breakthrough choices at milestone levels or timed intervals
- Elite drops that offer treasure-grade upgrades or consumables

### Meta Progression

Keep this light at first. The early goal is replayability through build variety, not heavy grind.

- Unlock new weapon families
- Unlock new upgrade pools
- Unlock new maps and enemy factions
- Minor persistent account bonuses through sect research

## Content Roadmap

### Milestone 1: Strong Vertical Slice

Goal: prove the fantasy and the moment-to-moment loop.

- 1 map
- 3 weapon families
- 12 to 18 common upgrades
- 6 enemy types
- 2 elites
- 1 boss
- 1 major breakthrough event

### Milestone 2: Replayable Alpha

- 2 maps with distinct enemy factions
- 5 weapon families
- Upgrade synergies and evolution mechanics
- Meta unlock track
- Boss modifiers and late-game calamities

## Initial Enemy Direction

The current enemy list is a functional placeholder. The roster should evolve into clearer combat roles.

- Swarmers: weak melee bodies that create crowd pressure
- Bruisers: slower, high-health units that force pathing decisions
- Divers: fast threats that punish greedy routing
- Ranged casters: create projectile patterns and area denial
- Support enemies: buff allies, heal packs, or summon hazards
- Elites: anchor encounters with telegraphed signature mechanics

## Build Archetypes For First Slice

These are the first three builds worth supporting because they are mechanically distinct and easy to read.

### Sword Storm

- Core: multi-sword volleys, pierce, cooldown reduction
- Playstyle: mid-range kiting and burst windows
- Signature evolution: swords split on hit and return through enemies

### Thunder Talisman

- Core: delayed explosive seals and chain lightning
- Playstyle: zone control and pack detonation
- Signature evolution: marked enemies arc thunder to nearby targets

### Jade Body

- Core: max health, retaliation, contact mitigation, short-range shockwaves
- Playstyle: controlled aggression and durability
- Signature evolution: taking damage triggers a cultivation burst instead of collapse

## Breakthrough System

Breakthroughs should be more than normal upgrades. They are the clearest expression of the cultivation theme.

- Trigger cadence: every 4 to 5 levels or at fixed time milestones
- Presentation: pause combat and surface 3 high-impact doctrine choices
- Outcome types:
  - Transform a weapon family
  - Add a new subsystem such as dash, summon, or shield
  - Trade risk for power through tribulation-style modifiers

## Economy And Rewards

- Common drops: qi orbs
- Elite drops: spirit treasure, healing pill, reroll token
- Boss rewards: sect scripture, map unlock, new doctrine

## Map Direction

The first map should communicate "cultivation world" immediately without depending on high-detail art.

- Fallen sect courtyard
- Broken spirit lanterns
- Cracked jade tiles
- Sparse fog banks and drifting talisman ash

Future maps:

- Mist bamboo valley
- Burial ridge
- Demon market outskirts

## Tone

- Serious martial-fantasy framing
- Clean and readable language in combat UI
- Short item lore lines with sect flavor, not comedy writing

## Immediate Design Tasks

1. Expand the current one-weapon prototype into three distinct weapon families.
2. Replace generic upgrades with archetype-specific and synergy-driven choices.
3. Extend the run from 6 minutes to 12 minutes with elite and boss beats.
4. Redesign the enemy roster around combat roles instead of only stat variation.
5. Add one breakthrough event that materially changes how the run plays.
