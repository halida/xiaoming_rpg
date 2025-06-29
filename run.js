import { Player } from './player.js';
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
}

function run(){
  const player = new Player();
  Displayer.player(player);
}

run()
