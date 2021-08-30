import { ScoreCalculator } from './score-calculator';

describe('ScoreCalculator', () => {
    test.each([[1, 10], [2, 20], [3, 30]])('getAdditionalScore', (speed, expected) => {
        const result = new ScoreCalculator().getAdditionalScore(speed);

        expect(result).toBe(expected);
    })
})
