import scoreReducer, { addScore, resetScore, ScoreState } from '../Score/score-slice';

describe('score reducer', () => {
    test('should handle initial state', () => {
        const reducer = scoreReducer(undefined, { type: 'unknown' });

        expect(reducer.score).toBe(0);
    });

    test('should increment', () => {
        const initialState: ScoreState = {
            score: 0,
        };

        const actual = scoreReducer(initialState, addScore(20));
        expect(actual.score).toEqual(20);
    });

    test('should reset score', () => {
        const initialState: ScoreState = {
            score: 100,
        };

        const actual = scoreReducer(initialState, resetScore());
        expect(actual.score).toEqual(0);
    });
});
