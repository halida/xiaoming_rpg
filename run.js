import { Game } from './game.js';
import { CliUi } from './cli_ui.js';

async function main() {
  console.log('欢迎来到小明 RPG！');
  const ui = new CliUi();
  const game = new Game(ui);
  await game.run();
  ui.end();
}

main();
