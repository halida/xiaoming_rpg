import { Game } from './game.js';
import { CliUi } from './cli_ui.js';

async function main() {
  const ui = new CliUi();
  const game = new Game(ui);
  await game.run();

  ui.close();
}

main();
