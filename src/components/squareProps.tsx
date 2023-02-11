import { tileState } from './tileState';



export interface squareProps {
    playSquare: (id: number) => string;
    id: number;
    value: string;
    gameState: tileState[];
}
