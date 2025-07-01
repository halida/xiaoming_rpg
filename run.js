import { Game } from './game.js';
import { CliUi } from './cli_ui.js';

async function main() {
  const ui = new CliUi();
  const game = new Game(ui);

  const choice = await ui.choose("选择操作", ["新游戏", "读取存档", "退出"]);

  switch (choice) {
    case "新游戏":
      await game.run();
      break;
    case "读取存档":
      game.load('save.json');
      await game.run();
      break;
    case "退出":
      break;
  }

  ui.close();
}

main();
