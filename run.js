import { Game } from './game.js';
import { CliUi } from './cli_ui.js';

const ui = new CliUi();

const game = new Game(ui);
game.run();
