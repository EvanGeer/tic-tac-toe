import React from 'react';
import { useState } from 'react';
import './board.css'
import { Square } from './Square';
import { tileState } from './tileState';


export function Board() {
    const tileArray = Array.from([...Array(9)]).map((x,i) => {
        return {id:i, value:''}
    });

    const [gameState, setGameState] = useState<tileState[]>(tileArray)
    const [turn, setTurn] = useState('O');


    function hasWinner() {
        return gameState.some(x => x.win);
    }
    
    const playSquare = (id: number) => {
        if(hasWinner()) return gameState[id].value; // game is over
        console.log(`Clicked id: ${id ?? 'null'}`)

        // increment player
        console.log(`Current Player: ${turn}`)
        const currentPlayer = turn;
        const nextPlayer = currentPlayer === 'O' ? 'X' : 'O';
        

        const newGameValue = {id, value: currentPlayer};
        const newGameState = [...gameState];
        newGameState[id] = newGameValue;
        
        // check for winner
        const newWinner = checkForWinner(id, newGameState);
        console.log(`winner: ${newWinner ?? 'none'}`)
        if(newWinner) newWinner.forEach(x => newGameState[x.id].win = true);

        // update game state
        setGameState(newGameState);
        console.log(newGameState);
        
        if(!newWinner) setTurn(nextPlayer); // this ensures that the proper winner is displayed
        return currentPlayer;
    }

    const checkRow = (tileIndex: number, newGameState: tileState[], val: string) => {
        const rowIndex = Math.floor(tileIndex/3);
        const start = rowIndex*3;
        const end = (rowIndex*3+3);
        const row = newGameState.slice(start, end);
        const rowVals = row.map(x => x.value);
        console.log(`Row ${rowIndex}: ${rowVals}`);
        if(rowVals.every(x => x === val))
        {
            console.log('winner!')
            console.log(rowVals);
            return row;
        }
        
    } 
    const checkCol = (tileIndex: number, newGameState: tileState[], val: string) => {
        const colIndex = tileIndex % 3;
        const colVals = [...Array(3)].map((x,i) => newGameState[(i*3)+colIndex])
        if(colVals.every(x => x.value === val)) return colVals;
    } 
    const checkDiag = (tileIndex: number, newGameState: tileState[], val: string) => {
        if(tileIndex % 2 !== 0) return; // all the diagonals are even :)
        const diag1Cells = [0,4,8];
        const diag1Vals = diag1Cells.map((i) => newGameState[i]);
        if(diag1Vals.every(x => x.value === val)) return diag1Vals;
        
        const diag2Cells = [2,4,6];
        const diag2Vals = diag2Cells.map((i) => newGameState[i])
        if(diag2Vals.every(x => x.value === val)) return diag2Vals;
    } 


    const checkForWinner = (tileIndex: number, newGameState:any) => {

        const val = newGameState[tileIndex];

        const winConditions = [checkRow, checkCol, checkDiag];

        const winner = winConditions
            .map(x => x(tileIndex, newGameState, turn))
            .find(x => x);
        if (winner?.length ?? -1 > 0) return winner;
    }

    function getTiles() {
        const tiles = gameState?.map(x =>
            <Square key={x.id} id={x.id} playSquare={playSquare} gameState={gameState} />
        )

        return tiles;
    }

    return (
        <>
        <h2>{hasWinner() 
            ? (<>{turn} Wins!</>)
            : <>{turn}'s turn</>
            }
            </h2>
            <div className='board'>
                {getTiles()}

            </div>
            {/* <button onClick={resetBoard}>New Game</button> */}
        </>
    )
}