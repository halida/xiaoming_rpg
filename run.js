import { Player, Enemy } from './player.js';
import { Displayer } from './displayer.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class Location {
  constructor(name) {
    this.name = name;
  }
}

class Game {
  constructor() {
    this.location = new Location("家");
    this.day = 1;
  }

  dice(n) {
    return Math.floor(Math.random() * n) + 1;
  }

  checkSolve(player, enemy, spend) {
    const add = Math.log(spend - 1, 2);

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
}

const lib = {
  enemies: [
    new Enemy("小学数学习题", 3, 2, 3, 2, 3),
    new Enemy("小学语文习题", 2, 3, 3, 2, 3),
    new Enemy("小学英语习题", 3, 3, 2, 2, 3),
  ],
}

async function run(){
  const rl = readline.createInterface({ input, output });
  const game = new Game();
  const player = new Player("小明", 5, 5, 5, 10, 0);

  console.log(`你是 ${player.name}，你要解决一堆习题`);

  const spend_map = {'a': 1, 'b': 3, 'c': 5, 'd': 9};

  const es = lib.enemies;
  for (const e of es) {
    Displayer.enemy(e);
    while (e.content > 0) {
      if (player.stamina <= 0) {
        console.log("精力都花光了，作业没做完");
        process.exit(0);
      }

      var s = null;
      while(!s) {
        const r = await rl.question(`选择需要投入的精力：${JSON.stringify(spend_map)}\n`);
        s = spend_map[r];
        if (!s) {
          console.log("无效的选择");
          continue;
        }
      }

      var result = game.battle(player, e, s);
      console.log("");
      const msg = result ? "做出来了" : "没做出来";
      console.log(`投入精力：${s}，${msg}，剩余内容: ${e.content}`);
      Displayer.player(player);
    }
  }
  console.log("作业都做完了");
  rl.close();
}

run()
