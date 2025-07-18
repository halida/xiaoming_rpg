import { MainScene } from './scene.js';
import { lib } from './lib.js';

export class Game {
  constructor(ui) {
    this.ui = ui;
    MainScene.load(this);
  }

  save() {
    return {
      player: this.player,
      location: this.location.name,
      location_enabled: this.locations.map(l => [l.name, l.enabled]),
      day: this.day,
    }
  }

  load(data) {
    Object.assign(this.player, data.player);
    this.location = this.locations.find(l => l.name === data.location);
    const game = this;
    data.location_enabled.map(function(d) {
      const name = d[0];
      const enabled = d[1];
      game.locations.find(l => l.name === name).enabled = enabled;
    });
    this.day = data.day;
  }

  dice(n) {
    return Math.floor(Math.random() * n) + 1;
  }

  checkSolve(player, enemy, spend) {
    const add = (spend <= 1) ? 0 : Math.log2(spend - 1);

    return (
      (this.dice(20) + add + player.knowledge >= 10 + enemy.difficulty) &&
        (this.dice(20) + add + player.reflex >= 10 + enemy.limit) &&
        (this.dice(20) + add + player.thinking >= 10 + enemy.skill));
  }

  async battle(player, enemy, spend) {
    player.stamina -= spend;
    const solved = this.checkSolve(player, enemy, spend);
    if (solved) {
      enemy.content--;
      if (enemy.content <= 0) {
        player.exp += enemy.exp;
        await this.checkForLevelUp(player);
      }
    }
    return solved;
  }

  async checkForLevelUp(player) {
    while (player.exp >= player.nextLevelExp) {
      player.level++;
      player.exp -= player.nextLevelExp;
      player.nextLevelExp = Math.floor(player.nextLevelExp * 1.5);
      this.ui.log(`\n恭喜 ${player.name} 升到了 ${player.level} 级!`);
      await this.upgradeAttribute(player);
    }
  }

  async upgradeAttribute(player) {
    const attributes = Object.keys(lib.attributes);
    const choice = await this.choose("选择一个属性来升级", attributes);

    player[lib.attributes[choice]]++;
    this.ui.log(`\n${player.name}的 ${choice} 提升了!`);
    this.ui.player(player);
  }

  async run() {
    const choice = await this.ui.choose("选择操作", ["新游戏", "读取存档", "退出"]);

    switch (choice) {
    case "新游戏":
      await this.loop();
      break;
    case "读取存档":
      const data = this.ui.load();
      if (data) {
        this.load(data);
        await this.loop();
      }
      break;
    case "退出":
      break;
    }
  }

  async loop() {
    while(true) {
      this.ui.log(`
你是 ${this.player.name}，你在 ${this.location.name}`);
      this.ui.player(this.player);
      this.ui.save(this.save());

      const ops = this.location.ops;
      const choices = ["移动", ...Object.keys(ops), "退出"];
      const chosenOp = await this.choose("选择操作", choices);

      switch(chosenOp) {
      case "移动":
        await this.move();
        break;
      case "退出":
        this.ui.end();
        return;
      default:
        await ops[chosenOp].call(this);
      }
    }
  }

  async move() {
    const moves = this.locations.
          filter(l => l.enabled && l.name !== this.location.name).
          map(l => l.name);

    if (moves.length === 0) {
      this.ui.log("没有其他地方可以去。");
      return;
    }

    const chosenLocName = await this.choose("移动到", moves);
    this.location = this.locations.find(
      (l) => l.name === chosenLocName);
  }

  async choose(prompt, list) {
    return await this.ui.choose(prompt, list);
  }

  async solving(es) {
    const spends = [1,3,5,9];

    for (const e of es) {
      this.ui.enemy(e);
      while (e.content > 0) {
        if (this.player.stamina <= 0) {
          this.ui.log("精力都花光了，作业没做完");
          return false;
        }
        const s = await this.choose("选择需要投入的精力", spends);

        var result = this.battle(this.player, e, s);
        this.ui.log("");
        const msg = result ? "做出来了" : "没做出来";
        this.ui.log(`投入精力：${s}，${msg}，剩余内容: ${e.content}`);
        this.ui.player(this.player);
      }
    }
    this.ui.log("作业都做完了");
    return true;
  }

}
