import { Area } from './area';
import { Snake } from './snake';
import { CellDirection } from './cell-direction';

describe('Type', () => {
    describe('constructor', () => {
        test('default', () => {
            const area = new Area(23, 35);

            const positionResult = area.snakePosition;
            const positionExpected = [11, 17]

            expect(area.height).toBe(23);
            expect(area.width).toBe(35);

            expect(area.snake).toBeTruthy();

            expect(positionResult).toStrictEqual(positionExpected);
        });

        test('extended', () => {
            const snake = new Snake([CellDirection.Right, CellDirection.Up]);
            const position: [number, number] = [12, 24];

            const area = new Area(23, 35, snake, position);

            expect(area.height).toBe(23);
            expect(area.width).toBe(35);

            expect(area.snake).toBe(snake);
            expect(area.snakePosition).toBe(position);
        });
    });
});
