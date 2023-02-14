import { useEffect, useState } from 'react';
import './board.css'
import { Tile } from './Tile';
import { TileState } from '../types/TileState';
import { Game } from '../logic/Game';
import { ComputerPlayer } from '../logic/ComputerPlayer';
import { PlayerSprite } from '../types/PlayerSprite';


export function Board() {
    const emptyGameState = Array.from([...Array(9)]).map((x, i) => {
        return { id: i, value: '' }
    });

    const [gameState, setGameState] = useState<TileState[]>(emptyGameState)
    const [turn, setTurn] = useState(PlayerSprite.O);
    const [winner, setWinner] = useState<PlayerSprite>();
    const [tie, setTie] = useState(false);

    const [computerPlayer, setComputerPlayer] = useState(PlayerSprite.X);

    useEffect(() => {
        executeComputerPlayerTurn();
    }, [turn, computerPlayer, winner, tie])

    useEffect(() => {
        setTie(Game.allTilesPlayed(gameState))
    }, [gameState])

    function executeComputerPlayerTurn() {
        if (!winner && !tie && turn === computerPlayer) {
            const computerPlay = ComputerPlayer.getPlay(gameState, turn);
            playSquare(computerPlay);
        }
    }        

    const playSquare = (clickedTileId: number) => {
        if (winner || tie) return gameState[clickedTileId].value; // game is over

        console.log(`Clicked id: ${clickedTileId ?? 'null'}`)
        console.log(`Current Player: ${turn}`)
        const newGameState = Game.getNewGameState(clickedTileId, turn, gameState);

        // check for winner
        const newWinner = Game.checkForWin(clickedTileId, newGameState, turn);
        console.log(`winner: ${newWinner ?? 'none'}`)
        if (newWinner) {
            newWinner.forEach(x => newGameState[x.id].win = true);
            setWinner(turn);
        }

        // update game state
        setGameState(newGameState);
        console.log(newGameState);

        // increment player        
        const currentPlayer = turn;
        const nextPlayer = PlayerSprite.next(turn);
        setTurn(nextPlayer);
        return currentPlayer;
    }

    const handleComputerPlayerChange = (e: any) => {
        setComputerPlayer(e.target.value);
    }

    const tiles = gameState?.map(x =>
        <Tile key={x.id} id={x.id} value={gameState[x.id].value} playSquare={playSquare} gameState={gameState} />
    );

    const resetGame = () => {
        setGameState(emptyGameState);
        setWinner(undefined);
        setTie(false);
    }

    return (
        <>
            <h2>{
                winner  ? <>{winner} Wins!</>
                : tie   ? <>Cat's Game...</>
                : <>{turn}'s turn</>
            }
            </h2>
            <small>Computer Player: <select 
                value={computerPlayer} onChange={handleComputerPlayerChange}>
                <option value={'none'}>None</option>
                <option value={PlayerSprite.O}>{PlayerSprite.O}</option>
                <option value={PlayerSprite.X}>{PlayerSprite.X}</option>
            </select>
            </small>            
            <div className='board'>
                {tiles}
            </div>
            <button onClick={resetGame} className={(winner || tie) ? 'white-border' : ''}>New Game</button>            

        </>
    )
}


