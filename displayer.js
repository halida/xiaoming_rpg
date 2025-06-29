export class Displayer {
    static player(player) {
        console.log('Player Attributes:');
        console.log(`  Name: ${player.name}`);
        console.log(`  HP: ${player.hp}`);
        console.log(`  MP: ${player.mp}`);
    }
}
