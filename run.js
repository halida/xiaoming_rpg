import { Game } from './game.js';
import { CliUi } from './cli_ui.js';
import { Displayer } from './displayer.js';

const ui = new CliUi();
ui.log = console.log;
ui.player = Displayer.player;
ui.enemy = Displayer.enemy;

const game = new Game(ui);
game.run();
