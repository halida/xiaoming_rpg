import { Game } from './game.js';

class BrowserUi {
  constructor(scene) {
    this.scene = scene;
  }

  async choose(prompt, list) {
    this.scene.showChoices(prompt, list);
    return new Promise((resolve) => {
      this.scene.events.once('choice', (choice) => {
        resolve(choice);
      });
    });
  }

  log(message) {
    this.scene.log(message);
  }

  player(player) {
    const text = `
名字: ${player.name}
知识: ${player.knowledge}，反应: ${player.reflex}，思考: ${player.thinking}
经验: ${player.exp}，下一级：${player.nextLevelExp}，精力: ${player.stamina}
`;
    this.scene.showPlayer(text);
  }

  enemy(enemy) {
    const text = `
名字: ${enemy.name}
难度: ${enemy.difficulty}，时限: ${enemy.limit}，技巧: ${enemy.skill}
经验: ${enemy.exp}，内容: ${enemy.content}
`;
    this.scene.showEnemy(text);
  }

  end() {
    this.scene.log("游戏结束");
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.logText = this.add.text(10, 10, '', { fill: '#0f0' });
    this.playerText = this.add.text(10, 150, '', { fill: '#0f0' });
    this.enemyText = this.add.text(400, 150, '', { fill: '#f00' });
    this.promptText = this.add.text(10, 300, '', { fill: '#0f0' });
    this.choicesText = this.add.text(10, 330, '', { fill: '#0f0' });

    const ui = new BrowserUi(this);
    this.game = new Game(ui);
    this.game.run();
  }

  log(message) {
    this.logText.setText(message);
  }

  showPlayer(text) {
    this.playerText.setText(text);
  }

  showEnemy(text) {
    this.enemyText.setText(text);
  }

  showChoices(prompt, choices) {
    this.promptText.setText(prompt);
    this.choicesText.setText(choices.map((c, i) => `${i + 1}: ${c}`).join('\n'));
    this.input.keyboard.off('keydown');
    this.input.keyboard.on('keydown', (event) => {
      const index = parseInt(event.key, 10) - 1;
      if (index >= 0 && index < choices.length) {
        this.events.emit('choice', choices[index]);
        this.clearChoices();
      }
    });
  }

  clearChoices() {
    this.promptText.setText('');
    this.choicesText.setText('');
  }
}

const config = {
  type: Phaser.AUTO,
  width: "100%",
  height: "100%",
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: GameScene,
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
