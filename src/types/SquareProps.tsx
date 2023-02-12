import { PlayerSprite } from './PlayerSprite';
import { TileState } from './TileState';



export type SquareProps = {
    playSquare: (id: number) => string;
    id: number;
    value: string;
    gameState: TileState[];
}
