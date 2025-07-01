import { Game } from './game.js';
import { CliUi } from './cli_ui.js';

async function run(){
  const ui = new CliUi();
  const game = new Game(ui);

  await game.run();

  rl.close();
}

run()
