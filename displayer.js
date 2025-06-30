export class Displayer {

  static player(player) {
    console.log(`名字: ${player.name}`);
    console.log(`知识: ${player.knowledge}，反应: ${player.reflex}，思考: ${player.thinking}`);
    console.log(`经验: ${player.exp}，下一级：${player.nextLevelExp}，精力: ${player.stamina}`);
  }

  static enemy(enemy) {
    console.log(`名字: ${enemy.name}`);
    console.log(`难度: ${enemy.difficulty}，时限: ${enemy.limit}，技巧: ${enemy.skill}`);
    console.log(`经验: ${enemy.exp}，内容: ${enemy.content}`);
  }

}
