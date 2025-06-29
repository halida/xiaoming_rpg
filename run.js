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
    }
    return solved;
  }
}

function run(){
  const game = new Game();
  const player = new Player("小明", 5, 5, 5, 20);
  const e = new Enemy("小学数学习题", 3, 3, 3, 2);

  var result = game.battle(player, e, 3);
  console.log(`做出来了吗？ ${result}`);
  console.log(`剩余内容: ${e.content}`);

  Displayer.player(player);
}

run()
