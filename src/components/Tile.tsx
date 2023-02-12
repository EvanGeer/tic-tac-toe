import React from 'react';
import { useState } from 'react';
import { PlayerSprite } from '../types/PlayerSprite';
import { SquareProps } from "../types/SquareProps";

export function Tile(props: SquareProps) {
    const { id, playSquare, gameState, value } = props;
    const [playValue, setPlayValue] = useState<string>(value);

    const handleClick = () => {
        console.log(playValue);
        if (gameState[id].value)
            return; //you can only click once;
        
        if (gameState.find(x => x.win))
            return; // game is over;

        const playedValue = playSquare(id);
        setPlayValue(playedValue);
    };

    return (
        <div id={id?.toString()} 
            className={`tile ${(gameState[id].win) ? 'win' : ''}`} 
            onClick={handleClick}
            >
                {props.value}
        </div>
    );
}
