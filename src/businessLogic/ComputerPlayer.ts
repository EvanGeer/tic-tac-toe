import { PlayerSprite } from "../types/PlayerSprite";
import { TileState } from "../types/TileState";
import { Game } from "./Game";

export namespace ComputerPlayer {

    export function getPlay(gameState: TileState[], player: PlayerSprite) {
        const prioritizedTiles = getPrioritizedEmptyTiles(gameState, player);

        const randomValue = Math.random();

        const randomIndex = Math.round(randomValue * (prioritizedTiles.length - 1));
        const play = prioritizedTiles[randomIndex]
        console.log(`Computer chooses index ${randomIndex}: ${play}`);

        return play;
    }

    function getPrioritizedEmptyTiles(gameState: TileState[], player: PlayerSprite) {
        const analyzedEmptyTiles = Game.winnableTileSets.map(tileSet => {
            const emptyTiles = tileSet.filter(x => gameState[x].value === '');
            if (emptyTiles.length !== 1)
                return { winning: false, blocking: false, emptyTiles };

            // at this point, we can assume only 1 blank tile
            const computerTiles = tileSet.filter(x => gameState[x].value === player);
            if (computerTiles.length === 2)
                return { winning: true, blocking: false, emptyTiles };

            const opponentTiles = tileSet.filter(x => gameState[x].value === PlayerSprite.next(player));
            if (opponentTiles.length === 2)
                return { winning: false, blocking: true, emptyTiles };

            return { winning: false, blocking: false, emptyTiles };
        });
        
        // we want to play winning first, then blocking second, then random third;
        console.log(analyzedEmptyTiles);
        const winningTiles = analyzedEmptyTiles.filter(x => x.winning);
        if (winningTiles.length > 0) return winningTiles.flatMap(x => x.emptyTiles);

        const blockingTiles = analyzedEmptyTiles.filter(x => x.blocking);
        if (blockingTiles.length > 0) return blockingTiles.flatMap(x => x.emptyTiles);

        return analyzedEmptyTiles.flatMap(x => x.emptyTiles);
    }
}