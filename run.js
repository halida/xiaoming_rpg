import { Player } from './player.js';

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

  const Game = new Game();

  console.log('Player Attributes:');
  console.log(`  Name: ${player.name}`);
  console.log(`  HP: ${player.hp}`);
  console.log(`  MP: ${player.mp}`);

}
