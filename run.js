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

  battle(player, enemy, spend) {

  }
}

function run(){
  const game = new Game();
  const player = new Player();
  const e = new Enemy("小学数学习题", 3, 3, 3);

  var result = game.battle(player, e, 3);
  console.log(`result: ${result}`);

  Displayer.player(player);
}

run()
