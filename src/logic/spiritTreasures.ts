import {
  MAX_SPIRIT_TREASURE_SLOTS,
  spiritTreasureConfigs,
  type SpiritTreasureEffectKind,
  type SpiritTreasureId
} from "../data/spiritTreasures";

export type SpiritTreasureEffectTotals = Record<SpiritTreasureEffectKind, number>;

export type SpiritTreasureAcquisition =
  // The treasure was stored: either an empty slot was filled, or it was already
  // held (a no-op). `activeIds` is the resulting set.
  | { kind: "stored"; activeIds: SpiritTreasureId[] }
  // All three slots are full: the player must replace one or leave the treasure.
  // `activeIds` is unchanged.
  | { kind: "replace-required"; activeIds: SpiritTreasureId[]; offeredId: SpiritTreasureId };

/**
 * Resolve contact with a Spirit Treasure. Fills an empty slot when there is
 * room (or no-ops when already held); otherwise signals that a replacement
 * choice is required, since a cultivator keeps at most three.
 */
export function offerSpiritTreasure(
  activeIds: SpiritTreasureId[],
  offeredId: SpiritTreasureId
): SpiritTreasureAcquisition {
  if (activeIds.includes(offeredId)) {
    return { kind: "stored", activeIds };
  }

  if (activeIds.length < MAX_SPIRIT_TREASURE_SLOTS) {
    return { kind: "stored", activeIds: [...activeIds, offeredId] };
  }

  return { kind: "replace-required", activeIds, offeredId };
}

/** Swap an held treasure for the offered one, preserving slot order. */
export function replaceSpiritTreasure(
  activeIds: SpiritTreasureId[],
  replacedId: SpiritTreasureId,
  offeredId: SpiritTreasureId
): SpiritTreasureId[] {
  if (!activeIds.includes(replacedId) || activeIds.includes(offeredId)) {
    return activeIds;
  }
  return activeIds.map((id) => (id === replacedId ? offeredId : id));
}

/** Sum the Cultivator Attribute bonuses granted by the active treasures. */
export function aggregateSpiritTreasureEffects(
  activeIds: SpiritTreasureId[]
): SpiritTreasureEffectTotals {
  const totals: SpiritTreasureEffectTotals = {
    maxHealth: 0,
    moveSpeed: 0,
    magnetRadius: 0,
    mitigation: 0
  };

  for (const id of activeIds) {
    const config = spiritTreasureConfigs[id];
    totals[config.effect] += config.value;
  }

  return totals;
}
