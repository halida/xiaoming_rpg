export class Displayer {
    static player(player) {
        console.log('角色:');
        console.log(`名字: ${player.name}`);
        console.log(`属性：`);
        console.log(`知识: ${player.knowledge}`);
        console.log(`反应: ${player.reflex}`);
        console.log(`思考: ${player.thinking}`);
        console.log(`状态：`);
        console.log(`精力: ${player.stamina}`);
    }
}
