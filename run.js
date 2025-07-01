import { Game } from './game.js';
import { CliUi } from './cli_ui.js';

async function main() {
  const ui = new CliUi();
  const game = new Game(ui);

  if (process.argv.includes('load')) {
    game.load('save.json');
  }

  await game.run();
  ui.close();
}

main();
