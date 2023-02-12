export enum PlayerSprite {
    O = 'O',
    X = 'X',
}

export namespace PlayerSprite {
    export function next(currentPlayer: PlayerSprite): PlayerSprite {
        return (currentPlayer === PlayerSprite.X)
            ? PlayerSprite.O
            : PlayerSprite.X; 
    }
}