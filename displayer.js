export class Displayer {
  static player(player) {
    console.log(`名字: ${player.name}`);
    console.log(`知识: ${player.knowledge}，反应: ${player.reflex}，思考: ${player.thinking}`);
    console.log(`经验: ${player.exp}，精力: ${player.stamina}`);
  }
}
