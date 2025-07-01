import { Game } from './game.js';
import { CliUi } from './cli_ui.js';
import { Displayer } from './displayer.js';

const ui = new CliUi();
const displayer = {
  log: console.log,
  player: Displayer.player,
  enemy: Displayer.enemy,
};
const game = new Game(ui, displayer);
game.run();