import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as fs from 'fs';

import { Displayer } from './displayer.js';

export class CliUi {
  constructor(rl) {
    this.log = console.log;
    this.player = Displayer.player;
    this.enemy = Displayer.enemy;
    this.rl = readline.createInterface({ input, output });
  }

  savePath(){
    return "data.json";
  }

  save(data) {
    const path = this.savePath();
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    this.log(`游戏已保存到 ${path}`);
  }

  load() {
    const path = this.savePath();
    const data = fs.readFileSync(path, 'utf-8');
    this.log(`游戏已从 ${path} 加载`);
    return JSON.parse(data);
  }

  async choose(prompt, list) {
    const mapping = {}
    list.forEach((c, i) => mapping[i+1] = c);
    const choicesText = Object.entries(mapping).
          map(([key, value]) => `${key}:${value}`).
          join(', ');

    var s = null;
    while(s === null) {
      const r = await this.rl.question(
        `${ prompt }	${ choicesText }\n`);
      s = mapping[r];
      if (s === undefined) {
        console.log("无效的选择");
        s = null;
      }
    }
    return s;
  }

  close() {
    this.rl.close();
  }
}
