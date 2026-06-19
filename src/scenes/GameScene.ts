import Phaser from "phaser";
import { enemyConfigs } from "../data/enemies";
import { upgradeConfigs, type UpgradeConfig } from "../data/upgrades";
import { waveDurationMs } from "../data/waves";
import { baseFlyingSword } from "../data/weapons";
import { Enemy } from "../entities/Enemy";
import { Player } from "../entities/Player";
import { Projectile } from "../entities/Projectile";
import { XPOrb } from "../entities/XPOrb";
import { InputController } from "../systems/InputController";
import { SpawnerSystem } from "../systems/SpawnerSystem";
import { pickUniqueRandom } from "../utils/random";

interface SwordState {
  damage: number;
  cooldownMs: number;
  projectileSpeed: number;
  projectileLifetimeMs: number;
  pierce: number;
  count: number;
}

interface RunState {
  level: number;
  xp: number;
  xpToNext: number;
  kills: number;
  elapsedMs: number;
  paused: boolean;
  gameOver: boolean;
}

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private inputController!: InputController;
  private enemies!: Phaser.Physics.Arcade.Group;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private orbs!: Phaser.Physics.Arcade.Group;
  private spawner!: SpawnerSystem;
  private swordState: SwordState = {
    damage: baseFlyingSword.baseDamage,
    cooldownMs: baseFlyingSword.cooldownMs,
    projectileSpeed: baseFlyingSword.projectileSpeed,
    projectileLifetimeMs: baseFlyingSword.projectileLifetimeMs,
    pierce: baseFlyingSword.pierce,
    count: baseFlyingSword.count
  };
  private swordCooldownRemaining = 0;
  private runState: RunState = {
    level: 1,
    xp: 0,
    xpToNext: 8,
    kills: 0,
    elapsedMs: 0,
    paused: false,
    gameOver: false
  };
  private levelUpActive = false;

  constructor() {
    super("game");
  }

  create(): void {
    this.physics.world.setBounds(-2000, -2000, 4000, 4000);
    this.add
      .rectangle(0, 0, 5000, 5000, 0x0c1520, 1)
      .setOrigin(0.5)
      .setDepth(-10);

    this.player = new Player(this, 0, 0);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1);

    this.enemies = this.physics.add.group({ runChildUpdate: false });
    this.projectiles = this.physics.add.group({ runChildUpdate: false });
    this.orbs = this.physics.add.group({ runChildUpdate: false });
    this.inputController = new InputController(this);
    this.spawner = new SpawnerSystem(this, this.enemies);

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.handleProjectileHit,
      undefined,
      this
    );

    this.physics.add.overlap(this.player, this.orbs, this.collectOrb, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.handlePlayerContact, undefined, this);

    this.events.on("apply-upgrade", this.applyUpgrade, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.events.off("apply-upgrade", this.applyUpgrade, this);
    });

    this.publishHud();
  }

  update(_time: number, delta: number): void {
    if (
      this.inputController.pausePressed &&
      !this.runState.gameOver &&
      !this.levelUpActive
    ) {
      this.togglePause();
    }

    if (this.runState.paused || this.runState.gameOver) {
      this.player.move(new Phaser.Math.Vector2(0, 0));
      return;
    }

    this.runState.elapsedMs += delta;
    this.swordCooldownRemaining -= delta;

    const movement = this.inputController.getMovementVector();
    this.player.move(movement);

    const playerPosition = new Phaser.Math.Vector2(this.player.x, this.player.y);
    this.spawner.update(delta, playerPosition);

    this.enemies.children.each((child) => {
      const enemy = child as Enemy;
      enemy.chase(playerPosition);
    });

    this.pullNearbyOrbs();

    if (this.swordCooldownRemaining <= 0) {
      this.fireFlyingSwords();
      this.swordCooldownRemaining = this.swordState.cooldownMs;
    }

    if (this.runState.elapsedMs >= waveDurationMs) {
      this.runState.gameOver = true;
      this.setPausedState(true);
      this.publishHud("Tribulation survived. Outer sect awaits.");
    } else {
      this.publishHud();
    }
  }

  private handleProjectileHit = (
    projectileObj: Phaser.GameObjects.GameObject,
    enemyObj: Phaser.GameObjects.GameObject
  ): void => {
    const projectile = projectileObj as Projectile;
    const enemy = enemyObj as Enemy;

    const died = enemy.receiveDamage(projectile.damage);
    projectile.pierceRemaining -= 1;

    if (projectile.pierceRemaining <= 0) {
      projectile.destroy();
    }

    if (!died) {
      return;
    }

    this.spawnOrb(enemy.x, enemy.y, enemy.config.xpDrop);
    enemy.destroy();
    this.runState.kills += 1;
  };

  private collectOrb = (
    _playerObj: Phaser.GameObjects.GameObject,
    orbObj: Phaser.GameObjects.GameObject
  ): void => {
    const orb = orbObj as XPOrb;
    this.runState.xp += orb.xpValue;
    orb.destroy();

    if (this.runState.xp >= this.runState.xpToNext) {
      this.runState.xp -= this.runState.xpToNext;
      this.runState.level += 1;
      this.runState.xpToNext = Math.floor(this.runState.xpToNext * 1.32 + 3);
      this.offerLevelUp();
      return;
    }

    this.publishHud();
  };

  private handlePlayerContact = (
    _playerObj: Phaser.GameObjects.GameObject,
    enemyObj: Phaser.GameObjects.GameObject
  ): void => {
    const enemy = enemyObj as Enemy;
    const now = this.time.now;

    if (enemy.contactCooldownUntil > now) {
      return;
    }

    enemy.contactCooldownUntil = now + 750;
    this.player.applyDamage(enemy.config.touchDamage);

    if (this.player.stats.health <= 0) {
      this.runState.gameOver = true;
      this.setPausedState(true);
      this.publishHud("Cultivator fell. Qi scattered.");
      return;
    }

    this.publishHud();
  };

  private spawnOrb(x: number, y: number, xpValue: number): void {
    const orb = new XPOrb(this, x, y, xpValue);
    this.orbs.add(orb);
  }

  private pullNearbyOrbs(): void {
    this.orbs.children.each((child) => {
      const orb = child as XPOrb;
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        orb.x,
        orb.y
      );

      if (distance <= this.player.stats.magnetRadius) {
        this.physics.moveToObject(orb, this.player, 280);
      }
    });
  }

  private fireFlyingSwords(): void {
    const targets = this.getNearestEnemies(this.swordState.count);
    if (targets.length === 0) {
      return;
    }

    targets.forEach((enemy, index) => {
      const projectile = new Projectile(
        this,
        this.player.x,
        this.player.y - 10 + index * 4,
        baseFlyingSword.projectileTexture
      );
      projectile.damage = this.swordState.damage;
      projectile.pierceRemaining = this.swordState.pierce;
      projectile.setAngle(Phaser.Math.RadToDeg(
        Phaser.Math.Angle.Between(this.player.x, this.player.y, enemy.x, enemy.y)
      ));
      this.projectiles.add(projectile);
      this.physics.moveToObject(projectile, enemy, this.swordState.projectileSpeed);
      this.time.delayedCall(this.swordState.projectileLifetimeMs, () => {
        if (projectile.active) {
          projectile.destroy();
        }
      });
    });
  }

  private getNearestEnemies(count: number): Enemy[] {
    const enemies = this.enemies.getChildren() as Enemy[];
    return enemies
      .filter((enemy) => enemy.active)
      .sort((a, b) => {
        const distanceA = Phaser.Math.Distance.Between(this.player.x, this.player.y, a.x, a.y);
        const distanceB = Phaser.Math.Distance.Between(this.player.x, this.player.y, b.x, b.y);
        return distanceA - distanceB;
      })
      .slice(0, count);
  }

  private offerLevelUp(): void {
    this.levelUpActive = true;
    this.setPausedState(true);
    const options = pickUniqueRandom(upgradeConfigs, 3);
    this.scene.get("ui").events.emit("show-level-up", options);
    this.publishHud();
  }

  private applyUpgrade(upgrade: UpgradeConfig): void {
    switch (upgrade.effect) {
      case "swordDamage":
        this.swordState.damage += upgrade.value;
        break;
      case "swordCooldown":
        this.swordState.cooldownMs = Math.max(
          180,
          Math.floor(this.swordState.cooldownMs * upgrade.value)
        );
        break;
      case "swordCount":
        this.swordState.count += upgrade.value;
        break;
      case "moveSpeed":
        this.player.stats.moveSpeed += upgrade.value;
        break;
      case "maxHealth":
        this.player.stats.maxHealth += upgrade.value;
        this.player.heal(upgrade.value);
        break;
      case "heal":
        this.player.heal(upgrade.value);
        break;
      case "magnet":
        this.player.stats.magnetRadius += upgrade.value;
        break;
    }

    this.levelUpActive = false;
    this.setPausedState(false);
    this.scene.get("ui").events.emit("hide-level-up");
    this.publishHud(`${upgrade.name} refined.`);
  }

  private togglePause(): void {
    this.setPausedState(!this.runState.paused);
    this.publishHud(this.runState.paused ? "Meditation pause." : undefined);
  }

  private setPausedState(paused: boolean): void {
    this.runState.paused = paused;
    this.physics.world.isPaused = paused;

    if (paused) {
      this.player.move(new Phaser.Math.Vector2(0, 0));
    }
  }

  private publishHud(message?: string): void {
    this.registry.set("hud", {
      health: this.player?.stats.health ?? 100,
      maxHealth: this.player?.stats.maxHealth ?? 100,
      level: this.runState.level,
      xp: this.runState.xp,
      xpToNext: this.runState.xpToNext,
      kills: this.runState.kills,
      elapsedMs: this.runState.elapsedMs,
      remainingMs: Math.max(0, waveDurationMs - this.runState.elapsedMs),
      paused: this.runState.paused,
      gameOver: this.runState.gameOver,
      swordDamage: this.swordState.damage,
      swordCount: this.swordState.count,
      swordCooldownMs: this.swordState.cooldownMs,
      moveSpeed: this.player?.stats.moveSpeed ?? 0,
      enemyKinds: Object.keys(enemyConfigs).length,
      enemyCount: this.enemies?.countActive(true) ?? 0,
      orbCount: this.orbs?.countActive(true) ?? 0,
      message
    });
  }
}
