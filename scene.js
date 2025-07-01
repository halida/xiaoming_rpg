import { Player, Enemy } from './life.js';

export class Location {
  constructor(name, ops, enabled=true) {
    this.name = name;
    this.ops = ops;
    this.enabled = enabled;
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
        "升级测试": async function(){
          game.player.exp += 1500;
          await game.checkForLevelUp(game.player);
        },
      }),
      new Location("小学", {
        "学习": async function(){
          const es = [
            new Enemy("小学数学习题", 2, 1, 2, 1, 10),
            new Enemy("小学语文习题", 1, 2, 2, 1, 10),
            new Enemy("小学英语习题", 2, 2, 1, 1, 10),
          ];
          await game.solving(es);
        },
        "模拟考试": async function(){
          const es = [
            new Enemy("小学数学模拟考", 3, 2, 3, 2, 10),
            new Enemy("小学语文模拟考", 2, 3, 3, 2, 10),
            new Enemy("小学英语模拟考", 3, 3, 2, 2, 10),
          ];
          await game.solving(es);
        },
        "升学考试": async function(){
          const es = [
            new Enemy("小学数学升学考", 3, 2, 3, 2, 10),
            new Enemy("小学语文升学考", 2, 3, 3, 2, 10),
            new Enemy("小学英语升学考", 3, 3, 2, 2, 10),
          ];
          const result = await game.solving(es);
          if (result) {
            game.ui.log("升学成功！");
            game.locations.find(l => l.name === "中学").enabled = true;
          }
        },
      }),
      new Location("中学", {
        "学习": async function(){
          const es = [
            new Enemy("中学数学习题", 5, 3, 5, 3, 30),
            new Enemy("中学语文习题", 3, 5, 5, 3, 30),
            new Enemy("中学英语习题", 5, 5, 3, 3, 30),
          ];
          await game.solving(es);
        },
        "高考": async function(){
          const es = [
            new Enemy("高考数学", 8, 6, 8, 4, 100),
            new Enemy("高考语文", 6, 8, 8, 4, 100),
            new Enemy("高考英语", 8, 8, 6, 4, 100),
          ];
          const result = await game.solving(es);
          if (result) {
            game.ui.log("高考成功！");
            game.locations.find(l => l.name === "大学").enabled = true;
          }
        },
      }, false),
      new Location("大学", {
        "学习": async function(){
          const es = [
            new Enemy("高数", 12, 10, 12, 5, 100),
            new Enemy("线代", 10, 12, 12, 5, 100),
            new Enemy("英语", 12, 12, 10, 5, 100),
          ];
          await game.solving(es);
        },
        "毕业": async function(){
          const es = [
            new Enemy("毕业论文", 15, 15, 15, 1, 500),
          ];
          const result = await game.solving(es);
          if (result) {
            game.ui.log("毕业成功！");
            game.locations.find(l => l.name === "工作").enabled = true;
          }
        },
      }, false),
      new Location("工作", {
        "上班": async function(){
          const es = [
            new Enemy("老板的PUA", 20, 20, 20, 10, 1000),
          ];
          const result = await game.solving(es);
          if (result) {
            game.ui.log("你战胜了老板！游戏通关！");
            game.ui.end();
          }
        },
      }, false),
    ];
    game.location = game.locations[0];
    game.day = 1;
  }
}
