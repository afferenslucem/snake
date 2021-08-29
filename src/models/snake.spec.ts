import { Snake } from './snake';
import { CellDirection } from './cell-direction';

describe('Snake', () => {
    describe('constructor', () => {
        test('default', () => {
            const snake = new Snake();

            const result = snake.body;
            const expected = [CellDirection.Up];

            expect(result).toStrictEqual(expected)
        });

        test('with body', () => {
            const body = [CellDirection.Left, CellDirection.Left, CellDirection.Up];
            const snake = new Snake(body);

            const result = snake.body;
            const expected = [...body];

            expect(result).toStrictEqual(expected)
        });
    });

    describe('Turning', () => {
        describe('Up', () => {
            test('for one section body', () => {
                const snake = new Snake([CellDirection.Left]);

                const result = snake.up();
                const expectedBody = [CellDirection.Left];
                const expectedNextDirection = CellDirection.Up;

                expect(result.body).toStrictEqual(expectedBody)
                expect(result.nextDirection).toStrictEqual(expectedNextDirection)
            });

            test('for long body', () => {
                const snake = new Snake([CellDirection.Left, CellDirection.Left, CellDirection.Down]);

                const result = snake.up();
                const expectedNextDirection = CellDirection.Up;
                const expectedBody = [CellDirection.Left, CellDirection.Left, CellDirection.Down];

                expect(result.body).toStrictEqual(expectedBody)
                expect(result.nextDirection).toStrictEqual(expectedNextDirection)
            });

            test('should pass against direction for long body', () => {
                const snake = new Snake([CellDirection.Down, CellDirection.Left, CellDirection.Left]);

                const result = snake.up().nextDirection;
                const expected = CellDirection.Down;

                expect(result).toStrictEqual(expected)
            });

            test('should turn for against direction for 1 section body', () => {
                const snake = new Snake([CellDirection.Down]);

                const result = snake.up().nextDirection;
                const expected = CellDirection.Up;

                expect(result).toStrictEqual(expected)
            });

            test('should pass same direction', () => {
                const snake = new Snake([CellDirection.Up, CellDirection.Left, CellDirection.Down]);

                const result = snake.up().nextDirection;
                const expected = CellDirection.Up;

                expect(result).toStrictEqual(expected)
            });
        });

        describe('Right', () => {
            test('for one section body', () => {
                const snake = new Snake([CellDirection.Up]);

                const result = snake.right().nextDirection;
                const expected = CellDirection.Right;

                expect(result).toStrictEqual(expected)
            });

            test('should pass against direction for long body', () => {
                const snake = new Snake([CellDirection.Left, CellDirection.Up, CellDirection.Left]);

                const result = snake.right().nextDirection;
                const expected = CellDirection.Left;

                expect(result).toStrictEqual(expected)
            });

            test('should turn to against direction for 1 section body', () => {
                const snake = new Snake([CellDirection.Left]);

                const result = snake.right().nextDirection;
                const expected = CellDirection.Right;

                expect(result).toStrictEqual(expected)
            });

            test('should pass same direction', () => {
                const snake = new Snake([CellDirection.Right, CellDirection.Up, CellDirection.Left]);

                const result = snake.right().nextDirection;
                const expected = CellDirection.Right;

                expect(result).toStrictEqual(expected)
            });
        });

        describe('Down', () => {
            test('for one section body', () => {
                const snake = new Snake([CellDirection.Right]);

                const result = snake.down().nextDirection;
                const expected = CellDirection.Down;

                expect(result).toStrictEqual(expected)
            });

            test('should pass against direction for long body', () => {
                const snake = new Snake([CellDirection.Up, CellDirection.Right, CellDirection.Right]);

                const result = snake.down().nextDirection;
                const expected = CellDirection.Up;

                expect(result).toStrictEqual(expected)
            });

            test('should turn to against direction for 1 section body', () => {
                const snake = new Snake([CellDirection.Up]);

                const result = snake.down().nextDirection;
                const expected = CellDirection.Down;

                expect(result).toStrictEqual(expected)
            });

            test('should pass same direction', () => {
                const snake = new Snake([CellDirection.Down, CellDirection.Right, CellDirection.Right]);

                const result = snake.down().body;
                const expected = [CellDirection.Down, CellDirection.Right, CellDirection.Right];

                expect(result).toStrictEqual(expected)
            });
        });

        describe('Left', () => {
            test('for one section body', () => {
                const snake = new Snake([CellDirection.Down]);

                const result = snake.left().nextDirection;
                const expected = CellDirection.Left;

                expect(result).toStrictEqual(expected)
            });

            test('should pass against direction for long body', () => {
                const snake = new Snake([CellDirection.Right, CellDirection.Up, CellDirection.Right]);

                const result = snake.left().nextDirection;
                const expected = CellDirection.Right;

                expect(result).toStrictEqual(expected)
            });

            test('should turn to against direction for 1 section body', () => {
                const snake = new Snake([CellDirection.Right]);

                const result = snake.left().nextDirection;
                const expected = CellDirection.Left;

                expect(result).toStrictEqual(expected)
            });

            test('should pass same direction', () => {
                const snake = new Snake([CellDirection.Left, CellDirection.Right, CellDirection.Right]);

                const result = snake.left().nextDirection;
                const expected = CellDirection.Left;

                expect(result).toStrictEqual(expected)
            });
        });
    });

    describe('Getters', () => {
        test('head', () => {
            const snake = new Snake([CellDirection.Up, CellDirection.Left]);

            const result = snake.headDirection;
            const expected = CellDirection.Up;

            expect(result).toBe(expected);
        });

        test('last', () => {
            const snake = new Snake([CellDirection.Up, CellDirection.Left]);

            const result = snake.tailDirection;
            const expected = CellDirection.Left;

            expect(result).toBe(expected);
        });

        describe('isHorizontal', () => {
            test('for up head', () => {
                const snake = new Snake([CellDirection.Up]);

                const result = snake.isHorizontal;
                const expected = false;

                expect(result).toBe(expected);
            });

            test('for right head', () => {
                const snake = new Snake([CellDirection.Right]);

                const result = snake.isHorizontal;
                const expected = true;

                expect(result).toBe(expected);
            });

            test('for down head', () => {
                const snake = new Snake([CellDirection.Down]);

                const result = snake.isHorizontal;
                const expected = false;

                expect(result).toBe(expected);
            });

            test('for left head', () => {
                const snake = new Snake([CellDirection.Left]);

                const result = snake.isHorizontal;
                const expected = true;

                expect(result).toBe(expected);
            });
        });

        describe('isVertical', () => {
            test('for up head', () => {
                const snake = new Snake([CellDirection.Up]);

                const result = snake.isVertical;
                const expected = true;

                expect(result).toBe(expected);
            });

            test('for right head', () => {
                const snake = new Snake([CellDirection.Right]);

                const result = snake.isVertical;
                const expected = false;

                expect(result).toBe(expected);
            });

            test('for down head', () => {
                const snake = new Snake([CellDirection.Down]);

                const result = snake.isVertical;
                const expected = true;

                expect(result).toBe(expected);
            });

            test('for left head', () => {
                const snake = new Snake([CellDirection.Left]);

                const result = snake.isVertical;
                const expected = false;

                expect(result).toBe(expected);
            });
        });
    });

    describe('Grow', () => {
       test('strict grow', () => {
           const snake = new Snake();

           const result = snake.grow().grow().body;
           const expected = [CellDirection.Up, CellDirection.Up, CellDirection.Up];

           expect(result).toStrictEqual(expected);
       });

        test('for long body', () => {
            const snake = new Snake([CellDirection.Left, CellDirection.Up, CellDirection.Right]);

            const result = snake.grow().body;
            const expected = [CellDirection.Left, CellDirection.Up, CellDirection.Right, CellDirection.Right];

            expect(result).toStrictEqual(expected);
        });
    });

    describe('Move', () => {
        test('for single section body', () => {
            const snake = new Snake();

            const result = snake.move().body;
            const expected = [CellDirection.Up];

            expect(result).toStrictEqual(expected);
        });

        test('for long body', () => {
            const snake = new Snake([CellDirection.Left, CellDirection.Left, CellDirection.Up, CellDirection.Right]);

            const result = snake.move().body;
            const expected = [CellDirection.Left, CellDirection.Left, CellDirection.Left, CellDirection.Up];

            expect(result).toStrictEqual(expected);
        });
    });
});
