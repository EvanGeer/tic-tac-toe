import { PlayerSprite } from "../types/PlayerSprite";
import { TileState } from "../types/TileState";

export namespace Game {
    export function getNewGameState(tileId: number, currentPlayer: PlayerSprite, gameState: TileState[]) {
        const newGameValue = { id: tileId, value: currentPlayer };
        const newGameState = [...gameState];
        newGameState[tileId] = newGameValue;
        return newGameState;
    }

    export const checkForWin = (tileIndex: number, newGameState: any, turn: PlayerSprite) => {

        const val = newGameState[tileIndex];

        const winConditions = [checkRow, checkCol, checkDiag];

        const winner = winConditions
            .map(x => x(tileIndex, newGameState, turn))
            .find(x => x);

        if (winner?.length ?? -1 > 0) return winner;
    }

    /** Game is over when all the tiles have been played */
    export const allTilesPlayed = (gameState: TileState[]) => gameState.every(x => x.value);

    export const winnableTileSets = [
        [0,1,2], // row 1
        [3,4,5], // row 2
        [6,7,8], // row 3
        [0,3,6], // col 1
        [1,4,7], // col 2
        [2,5,8], // col 3
        [0,4,8], // diag 1
        [2,4,6], // diag 2
    ]


    export function getRows(gameState: TileState[]) {
        const rows = [...Array(3)].map((x, i) => gameState.slice(i * 3, (i * 3) + 2));
        console.log(`rows: ${rows}`);
        return rows;
    }
    export function getCols(gameState: TileState[]) {
        const cols = [...Array(3)].map((x, i) => [gameState[i], gameState[i + 3], gameState[i + 6]]);
        console.log(`cols: ${cols}`);
        return cols;
    }
    export function getDiags(gameState: TileState[]) {
        const diags = [
            [gameState[0], gameState[4], gameState[8]],
            [gameState[2], gameState[4], gameState[6]]
        ]
        console.log(`diags: ${diags}`);
        return diags;
    }
}

const checkRow = (tileIndex: number, newGameState: TileState[], val: string) => {
    const rowIndex = Math.floor(tileIndex / 3);
    const start = rowIndex * 3;
    const end = (rowIndex * 3 + 3);
    const row = newGameState.slice(start, end);
    const rowVals = row.map(x => x.value);
    console.log(`Row ${rowIndex}: ${rowVals}`);
    if (rowVals.every(x => x === val)) {
        console.log('winner!')
        console.log(rowVals);
        return row;
    }

}
const checkCol = (tileIndex: number, newGameState: TileState[], val: string) => {
    const colIndex = tileIndex % 3;
    const colVals = [...Array(3)].map((x, i) => newGameState[(i * 3) + colIndex])
    if (colVals.every(x => x?.value === val)) return colVals;
}

const checkDiag = (tileIndex: number, newGameState: TileState[], val: string) => {
    if (tileIndex % 2 !== 0) return; // all the diagonals are even :)
    const diag1Cells = [0, 4, 8];
    const diag1Vals = diag1Cells.map((i) => newGameState[i]);
    if (diag1Vals.every(x => x.value === val)) return diag1Vals;

    const diag2Cells = [2, 4, 6];
    const diag2Vals = diag2Cells.map((i) => newGameState[i])
    if (diag2Vals.every(x => x.value === val)) return diag2Vals;
}


