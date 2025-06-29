import { Player, Enemy } from './player.js';
import { Displayer } from './displayer.js';

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

function run(){
  const game = new Game();
  const player = new Player("小明", 5, 5, 5, 10, 0);

  const es = lib.enemies;
  for (const e of es) {
    while (e.content > 0 && player.stamina > 0) {
      var result = game.battle(player, e, 3);
      console.log("");
      console.log(`当前面对：${e.name}，做出来了吗？ ${result}，剩余内容: ${e.content}`);
      Displayer.player(player);
    }
  }

}

run()
