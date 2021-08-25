import { Area } from './area';
import { Snake } from './snake';
import { CellDirection } from './cell-direction';
import { GameOver } from '../errors/game-over';

describe('Area', () => {
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

            const area = new Area(23, 35, { snake, snakePosition: position });

            expect(area.height).toBe(23);
            expect(area.width).toBe(35);

            expect(area.snake).toBe(snake);
            expect(area.snakePosition).toBe(position);
        });
    });

    describe('getSnakeCells', () => {
        test('for straight snake', () => {
            const snake = new Snake([CellDirection.Up, CellDirection.Up, CellDirection.Up, CellDirection.Up]);
            const area = new Area(20, 20, { snake, snakePosition: [0, 0] });

            const result = area.getSnakeCells();
            const expected = [[0, 0], [0, 1], [0, 2], [0, 3]];

            expect(result).toStrictEqual(expected);
        });

        test('for curve snake', () => {
            const snake = new Snake([CellDirection.Up, CellDirection.Up, CellDirection.Up, CellDirection.Left, CellDirection.Left, CellDirection.Down, CellDirection.Right]);
            const area = new Area(20, 20, { snake, snakePosition: [0, 0] });

            const result = area.getSnakeCells();
            const expected = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [1, 1]];

            expect(result).toStrictEqual(expected);
        });
    });

    describe('getNextSnakePosition', () => {
        test('for up head', () => {
            const snake = new Snake([CellDirection.Up]);
            const area = new Area(9, 9, { snake, snakePosition: [5, 5] });

            const result = area.getNextSnakePosition();
            const expected = [5, 4];

            expect(result).toStrictEqual(expected);
        });

        test('for right head', () => {
            const snake = new Snake([CellDirection.Right]);
            const area = new Area(9, 9, { snake, snakePosition: [5, 5] });

            const result = area.getNextSnakePosition();
            const expected = [6, 5];

            expect(result).toStrictEqual(expected);
        });

        test('for down head', () => {
            const snake = new Snake([CellDirection.Down]);
            const area = new Area(9, 9, { snake, snakePosition: [5, 5] });

            const result = area.getNextSnakePosition();
            const expected = [5, 6];

            expect(result).toStrictEqual(expected);
        });

        test('for left head', () => {
            const snake = new Snake([CellDirection.Left]);
            const area = new Area(9, 9, { snake, snakePosition: [5, 5] });

            const result = area.getNextSnakePosition();
            const expected = [4, 5];

            expect(result).toStrictEqual(expected);
        });
    });

    describe('checkBounds', () => {
        describe('check vertical bounds', () => {
            test('y bottom overflow', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [3, -1];

                const result = area.checkBounds(cell);
                const expected = false;

                expect(result).toBe(expected);
            });

            test('y top overflow', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [3, 5];

                const result = area.checkBounds(cell);
                const expected = false;

                expect(result).toBe(expected);
            });
        });

        describe('check horizontal bounds', () => {
            test('x bottom overflow', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [-1, 3];

                const result = area.checkBounds(cell);
                const expected = false;

                expect(result).toBe(expected);
            });

            test('x top overflow', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [5, 3];

                const result = area.checkBounds(cell);
                const expected = false;

                expect(result).toBe(expected);
            });
        });

        describe('check bounds circumstances', () => {
            test('x 0 value should be ok', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [0, 3];

                const result = area.checkBounds(cell);
                const expected = true;

                expect(result).toBe(expected);
            });

            test('x top border should be ok', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [4, 3];

                const result = area.checkBounds(cell);
                const expected = true;

                expect(result).toBe(expected);
            });

            test('y 0 value should be ok', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [3, 0];

                const result = area.checkBounds(cell);
                const expected = true;

                expect(result).toBe(expected);
            });

            test('y top border should be ok', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [3, 4];

                const result = area.checkBounds(cell);
                const expected = true;

                expect(result).toBe(expected);
            });

            test('center should be ok', () => {
                const area = new Area(5, 5);
                const cell: [number, number] = [2, 2];

                const result = area.checkBounds(cell);
                const expected = true;

                expect(result).toBe(expected);
            });
        });
    });

    describe('isSnakeCell', () => {
        let area: Area = null;

        beforeEach(() => {
            const snake = new Snake([CellDirection.Up, CellDirection.Up, CellDirection.Up, CellDirection.Left, CellDirection.Left, CellDirection.Down, CellDirection.Right]);

            area = new Area(20, 20, { snake, snakePosition: [0, 0] });

            // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [1, 1]];
        })

        test('check free cell', () => {
            const result = area.isSnakeCell([1, 0]);
            const expected = false;

            expect(result).toBe(expected);
        })

        test('check snake cell', () => {
            const result = area.isSnakeCell([1, 1]);
            const expected = true;

            expect(result).toBe(expected);
        })
    });

    describe('isFoodCell', () => {
        let area: Area = null;

        beforeEach(() => {
            area = new Area(20, 20, { snakePosition: [0, 0], foodCells: [[1, 1]] });
        })

        test('check free cell', () => {
            const result = area.isFoodCell([3, 3]);
            const expected = false;

            expect(result).toBe(expected);
        })

        test('check food cell', () => {
            const result = area.isFoodCell([1, 1]);
            const expected = true;

            expect(result).toBe(expected);
        })
    });

    test('generateRandomFreeCell', () => {
        const snake = new Snake([CellDirection.Up, CellDirection.Up, CellDirection.Up, CellDirection.Left, CellDirection.Left, CellDirection.Down, CellDirection.Right]);

        const area = new Area(20, 20, { snake, snakePosition: [0, 0] });

        const result = area.generateRandomFreeCell();

        expect(result).toBeTruthy();
    })

    describe('tick', () => {
        describe('Game over', () => {
            test('break beyond', () => {
                const snake = new Snake([CellDirection.Up,]);
                const area = new Area(20, 20, { snake, snakePosition: [0, 0] });

                expect(() => area.tick()).toThrowError(new GameOver('You break area beyond'));
            });

            test('break beyond', () => {
                const snake = new Snake([CellDirection.Down, CellDirection.Right, CellDirection.Up, CellDirection.Left, CellDirection.Left]);
                const area = new Area(20, 20, { snake, snakePosition: [1, 0] });

                expect(() => area.tick()).toThrowError(new GameOver('You did eat yourself'));
            });
        });
    });

    describe('turning', () => {
        test('turn right', () => {
            const snake = new Snake([CellDirection.Up,]);
            const area = new Area(21, 21, { snake, snakePosition: [10, 10] });

            const result = area.turnRight();

            expect(result.snake.head).toBe(CellDirection.Right);
            expect(result.snake.body.length).toBe(1);
            expect(result.snakePosition).toStrictEqual(area.snakePosition);
        });
    });
});
