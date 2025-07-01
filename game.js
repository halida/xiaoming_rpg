import { Player, Enemy } from './life.js';
import { Displayer } from './displayer.js';

const lib = {
  attributes: {
    "知识": "knowledge",
    "反应": "reflex",
    "思考": "thinking",
  },
}

class Location {
  constructor(name, ops) {
    this.name = name;
    this.ops = ops;
  }
}

export class Game {
  constructor(ui) {
    this.ui = ui;
    this.player = new Player("小明", 5, 5, 5, 30, 0);

    this.locations = [
      new Location("家", {
        "休息": function(){
          this.player.stamina = 30;
          console.log("休息好了");
        }}),
      new Location("小学", {
        "学习": async function(){
          const es = [
            new Enemy("小学数学习题", 3, 2, 3, 2, 30),
            new Enemy("小学语文习题", 2, 3, 3, 2, 30),
            new Enemy("小学英语习题", 3, 3, 2, 2, 30),
          ];
          await this.solving(es);
        }}),
    ];
    this.location = this.locations[0];
    this.day = 1;
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
      console.log(`\n恭喜 ${player.name} 升到了 ${player.level} 级!`);
      await this.upgradeAttribute(player);
    }
  }

  async upgradeAttribute(player) {
    const attributes = Object.keys(lib.attributes);
    const choice = await this.choose("选择一个属性来升级", attributes);

    player[lib.attributes[choice]]++;
    console.log(`\n${player.name}的 ${choice} 提升了!`);
    Displayer.player(player);
  }

  async run() {
    while(true) {
      console.log(`\n你是 ${this.player.name}，你在 ${this.location.name}`);
      Displayer.player(this.player);

      const ops = this.location.ops;
      const choices = ["移动", "升级", ...Object.keys(ops)];
      const chosenOp = await this.choose("选择操作", choices);

      switch(chosenOp) {
      case "移动":
        await this.move();
        break;
      case "升级":
        this.player.exp += 15;
        await this.checkForLevelUp(this.player);
        break;
      default:
        await ops[chosenOp].call(this);
      }
    }
  }

  async move() {
    const moves = this.locations.
          filter(l => l.name !== this.location.name).
          map(l => l.name);

    if (moves.length === 0) {
      console.log("没有其他地方可以去。");
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
      Displayer.enemy(e);
      while (e.content > 0) {
        if (this.player.stamina <= 0) {
          console.log("精力都花光了，作业没做完");
          return;
        }
        const s = await this.choose("选择需要投入的精力", spends);

        var result = this.battle(this.player, e, s);
        console.log("");
        const msg = result ? "做出来了" : "没做出来";
        console.log(`投入精力：${s}，${msg}，剩余内容: ${e.content}`);
        Displayer.player(this.player);
      }
    }
    console.log("作业都做完了");
  }
}
