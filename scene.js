import { Player, Enemy } from './life.js';

export class Location {
  constructor(name, ops) {
    this.name = name;
    this.ops = ops;
  }
}

export class MainScene {
  static load(game) {
    game.player = new Player("小明", 5, 5, 5, 30, 0);

    game.locations = [
      new Location("家", {
        "休息": function(){
          game.player.stamina = 30;
          game.ui.log("休息好了");
        },
        "升级": async function(){
          game.player.exp += 15;
          await game.checkForLevelUp(game.player);
        },
      }),
      new Location("小学", {
        "学习": async function(){
          const es = [
            new Enemy("小学数学习题", 3, 2, 3, 2, 30),
            new Enemy("小学语文习题", 2, 3, 3, 2, 30),
            new Enemy("小学英语习题", 3, 3, 2, 2, 30),
          ];
          await game.solving(es);
        }}),
    ];
    game.location = game.locations[0];
    game.day = 1;

  }
}
