import React from 'react';
import { useState } from 'react';
import { squareProps } from "./squareProps";

export function Square(props: squareProps) {
    const [playValue, setPlayValue] = useState('');
    const { id, playSquare, gameState } = props;

    const handleClick = () => {
        if (playValue)
            return; //you can only click once;
        if (gameState.find(x => x.win))
            return; // game is over;

        const playedValue = playSquare(id);
        setPlayValue(playedValue);
    };

    return (
        <div id={id?.toString()} className={`tile ${(gameState[id].win) ? 'win' : ''}`} onClick={handleClick}>{playValue}</div>
    );
}
