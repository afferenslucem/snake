import gameReducer, { changeSpeed, endGame, GameState, startGame } from './game-slice';

describe('game reducer', () => {
    test('should handle initial state', () => {
        const reducer = gameReducer(undefined, { type: 'unknown' });

        expect(reducer.speed).toBeNull();
        expect(reducer.gameOver).toBeNull();
        expect(reducer.started).toBe(false);
    });

    test('should handle startGame', () => {
        const initialState: GameState = {
            started: false,
            gameOver: 'end',
            speed: 0,
        };

        const actual = gameReducer(initialState, startGame());
        expect(actual.gameOver).toEqual(null);
        expect(actual.started).toEqual(true);
        expect(actual.speed).toEqual(1);
    });

    test('should handle changeSpeed', () => {
        const initialState: GameState = {
            started: true,
            gameOver: null,
            speed: 0,
        };

        const actual = gameReducer(initialState, changeSpeed(3));
        expect(actual.speed).toEqual(3);
    });

    test('should handle endGame', () => {
        const initialState: GameState = {
            started: true,
            gameOver: null,
            speed: 3,
        };

        const actual = gameReducer(initialState, endGame('stopped'));
        expect(actual.speed).toEqual(null);
        expect(actual.started).toEqual(false);
        expect(actual.gameOver).toEqual('stopped');
    });
});
