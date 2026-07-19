import { describe, expect, it } from "vitest";
import { gongfaConfigs, type GongfaId } from "../../src/data/gongfa";
import {
  authoredGongfaMechanicList,
  authoredGongfaMechanics,
  createAuthoredGongfaRuntimeState
} from "../../src/data/authoredGongfaMechanics";
import {
  advanceGongfaRuntime,
  createGongfaCollectionFromCheckpoint,
  createGongfaCollectionRuntime,
  createGongfaRuntime,
  learnGongfa,
  planGongfaAttack,
  projectGongfaCollectionCheckpoint
} from "../../src/logic/gongfaRuntime";

describe("approved Gongfa mechanic contracts", () => {
  it("defines one authored contract for every playable Gongfa", () => {
    const ids = Object.keys(gongfaConfigs) as GongfaId[];
    expect(authoredGongfaMechanicList).toHaveLength(25);
    expect(new Set(authoredGongfaMechanicList.map((spec) => spec.gongfaId))).toEqual(new Set(ids));
    for (const id of ids) {
      expect(authoredGongfaMechanics[id].gongfaId).toBe(id);
      expect(createAuthoredGongfaRuntimeState(id).mechanicId).toBe(authoredGongfaMechanics[id].mechanicId);
    }
  });

  it("does not collapse any two Gongfa onto the same mechanic or resource engine", () => {
    expect(new Set(authoredGongfaMechanicList.map((spec) => spec.mechanicId)).size).toBe(25);
    expect(new Set(authoredGongfaMechanicList.map((spec) => spec.resourceSource)).size).toBe(25);
    expect(new Set(authoredGongfaMechanicList.map((spec) => spec.playerLever)).size).toBe(25);
    expect(new Set(authoredGongfaMechanicList.map((spec) => spec.spatialShape)).size).toBe(25);
  });

  it("keeps automatic combat and forbids the old generic hit-stack-decay loop", () => {
    for (const spec of authoredGongfaMechanicList) {
      expect(spec.manualAim).toBe(false);
      expect(spec.resourceSource).not.toMatch(/generic|hit-stack|hits-build/);
      expect(spec.failureCondition.length).toBeGreaterThan(24);
      expect(spec.capstoneRule.length).toBeGreaterThan(24);
    }
  });

  it("gives every mechanic an explicit bounded balance and visual envelope", () => {
    for (const spec of authoredGongfaMechanicList) {
      expect(spec.balance.damage).toBeGreaterThanOrEqual(0.8);
      expect(spec.balance.damage).toBeLessThanOrEqual(1.2);
      expect(spec.balance.survival).toBeGreaterThanOrEqual(0.6);
      expect(spec.balance.survival).toBeLessThanOrEqual(1.25);
      expect(spec.balance.control).toBeGreaterThanOrEqual(0.6);
      expect(spec.balance.control).toBeLessThanOrEqual(1.2);
      expect(spec.balance.payoffSeconds).toBeGreaterThanOrEqual(7);
      expect(spec.balance.payoffSeconds).toBeLessThanOrEqual(18);
      expect(spec.balance.objectBudget).toBeGreaterThan(0);
      expect(`${spec.visual.geometry}:${spec.visual.motion}:${spec.visual.silhouette}`).not.toBe("::");
    }
  });

  it("collects ranked corpse souls by position and consumes one finite wraith crossing", () => {
    let runtime = createGongfaRuntime({ gongfaId: "mist-wraith-canon" });
    runtime = advanceGongfaRuntime(runtime, {
      kind: "enemy-death", targetId: 7, x: 40, y: 0, rank: "elite",
      velocityX: 0, velocityY: 0, playerX: 0, playerY: 0
    }).runtime;
    expect(runtime.authored.anchors).toEqual([
      expect.objectContaining({ kind: "corpse-soul", value: 2, remainingMs: 12_000 })
    ]);

    runtime = advanceGongfaRuntime(runtime, {
      kind: "tick", deltaMs: 100, nearbyEnemyCount: 1, isMoving: true,
      movementDistance: 12, movementAngle: 0, playerX: 20, playerY: 0, targets: []
    }).runtime;
    expect(runtime.authored.anchors[0]).toMatchObject({ kind: "stored-soul", value: 2 });
    expect(runtime.authored.charges).toBe(1);

    const [crossing] = planGongfaAttack(runtime, 0);
    expect(crossing).toMatchObject({
      kind: "authored-line-strike",
      style: "mist-wraith-crossing",
      damage: runtime.combat.damage * 2
    });
    expect(runtime.authored.charges).toBe(0);
    expect(runtime.authored.anchors).toHaveLength(0);
  });

  it("binds one grave sword to each corpse and raises it once for a later trespasser", () => {
    let runtime = createGongfaRuntime({ gongfaId: "sword-burial-formation" });
    runtime = advanceGongfaRuntime(runtime, {
      kind: "enemy-death", targetId: 9, x: 80, y: 20, rank: "ordinary",
      velocityX: 100, velocityY: 0, playerX: 0, playerY: 0
    }).runtime;
    expect(runtime.authored.anchors).toEqual([
      expect.objectContaining({ kind: "grave-sword", x: 80, y: 20, angle: 0 })
    ]);

    const triggered = advanceGongfaRuntime(runtime, {
      kind: "tick", deltaMs: 16, nearbyEnemyCount: 1, playerX: 0, playerY: 0,
      targets: [{ targetId: 10, x: 82, y: 22, healthRatio: 1, rank: "ordinary" }]
    });
    expect(triggered.commands).toEqual([
      expect.objectContaining({ kind: "authored-line-strike", style: "grave-sword-rise", angle: 0 })
    ]);
    expect(triggered.runtime.authored.anchors).toHaveLength(0);
    expect(triggered.runtime.authored.charges).toBe(0);
  });

  it("persists authored inventories while resetting transient movement continuity", () => {
    let collection = learnGongfa(createGongfaCollectionRuntime(), "sword-burial-formation", true);
    const runtime = collection.byId["sword-burial-formation"]!;
    runtime.authored.anchors.push({ kind: "grave-sword", x: 12, y: 34, value: 1, angle: 0.5 });
    runtime.authored.continuousMovementMs = 900;
    runtime.authored.continuousDistance = 180;

    const checkpoint = projectGongfaCollectionCheckpoint(collection);
    collection = createGongfaCollectionFromCheckpoint(checkpoint);
    expect(collection.byId["sword-burial-formation"]!.authored.anchors).toEqual([
      expect.objectContaining({ kind: "grave-sword", x: 12, y: 34, angle: 0.5 })
    ]);
    expect(collection.byId["sword-burial-formation"]!.authored.continuousMovementMs).toBe(0);
    expect(collection.byId["sword-burial-formation"]!.authored.continuousDistance).toBe(0);
  });
});
