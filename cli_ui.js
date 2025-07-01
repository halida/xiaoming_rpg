import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export class CliUi {
  constructor(rl) {
    this.rl = readline.createInterface({ input, output });
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
        `${ prompt }\t${ choicesText }\n`);
      s = mapping[r];
      if (s === undefined) {
        console.log("无效的选择");
        s = null;
      }
    }
    return s;
  }

}
