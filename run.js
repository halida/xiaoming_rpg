import { Player, Enemy } from './player.js';
import { Displayer } from './displayer.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class Location {
  constructor(name, ops) {
    this.name = name;
    this.ops = ops;
  }
}

class Game {
  constructor(rl) {
    this.rl = rl;
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
            new Enemy("小学数学习题", 3, 2, 3, 2, 3),
            new Enemy("小学语文习题", 2, 3, 3, 2, 3),
            new Enemy("小学英语习题", 3, 3, 2, 2, 3),
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

  battle(player, enemy, spend) {
    player.stamina -= spend;
    const solved = this.checkSolve(player, enemy, spend);
    if (solved) {
      enemy.content --;
      if (enemy.content <= 0) {
        player.exp += enemy.exp;
      }
    }
    return solved;
  }

  async run() {
    while(true) {
      console.log(`\n你是 ${this.player.name}，你在 ${this.location.name}`);
      Displayer.player(this.player);
      const ops = this.location.ops;
      const opNames = Object.keys(ops);
      const choices = [...opNames, "移动"];
      const chosenOp = await this.choose("选择操作", choices);

      if (chosenOp === "移动") {
        const moves = this.locations.filter(l => l.name !== this.location.name).map(l => l.name);

        if (moves.length === 0) {
            console.log("没有其他地方可以去。");
            continue;
        }

        const chosenLocName = await this.choose("移动到", moves);
        this.location = this.locations.find((l) => l.name === chosenLocName);
      } else {
        await ops[chosenOp].call(this);
      }
    }
  }

  async choose(prompt, list) {
    const mapping = {}
    list.forEach((c, i) => mapping[i+1] = c);

    var s = null;
    while(s === null) {
      const r = await this.rl.question(
        `${prompt}：${JSON.stringify(mapping)}\n`);
      s = mapping[r];
      if (s === undefined) {
        console.log("无效的选择");
        s = null;
      }
    }
    return s;
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

async function run(){
  const rl = readline.createInterface({ input, output });
  const game = new Game(rl);

  await game.run();

  rl.close();
}

run()
