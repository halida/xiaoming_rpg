import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { Displayer } from './displayer.js';
import { Game } from './game.js';

async function run(){
  const rl = readline.createInterface({ input, output });
  const game = new Game(rl);

  await game.run();

  rl.close();
}

run()
