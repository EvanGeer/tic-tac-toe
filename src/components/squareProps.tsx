import { tileState } from './tileState';



export interface squareProps {
    playSquare: (id: number) => string;
    id: number;
    gameState: tileState[];
}
