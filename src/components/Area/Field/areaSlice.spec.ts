import areaReducer, { AreaState, tick, turnDown, turnLeft, turnRight, turnUp } from './areaSlice';
import { Area } from '../../../models/area';
import { CellDirection } from '../../../models/cell-direction';
import { Snake } from '../../../models/snake';

describe('counter reducer', () => {
    test('should handle initial state', () => {
        const reducer = areaReducer(undefined, { type: 'unknown' });

        expect(reducer.area).toBeInstanceOf(Area);
    });

    test('should handle turnUp', () => {
        const initialState: AreaState = {
            area: new Area(11, 11, { snake: new Snake([CellDirection.Left]) }),
        };

        const actual = areaReducer(initialState, turnUp());
        expect(actual.area.snake.head).toEqual(CellDirection.Up);
    });

    test('should handle turnRight', () => {
        const initialState: AreaState = {
            area: new Area(11, 11),
        };

        const actual = areaReducer(initialState, turnRight());
        expect(actual.area.snake.head).toEqual(CellDirection.Right);
    });

    test('should handle turnDown', () => {
        const initialState: AreaState = {
            area: new Area(11, 11, { snake: new Snake([CellDirection.Left]) }),
        };

        const actual = areaReducer(initialState, turnDown());
        expect(actual.area.snake.head).toEqual(CellDirection.Down);
    });

    test('should handle turnLeft', () => {
        const initialState: AreaState = {
            area: new Area(11, 11 ),
        };

        const actual = areaReducer(initialState, turnLeft());
        expect(actual.area.snake.head).toEqual(CellDirection.Left);
    });

    test('should handle tick', () => {
        const initialState: AreaState = {
            area: new Area(11, 11 ),
        };

        const actual = areaReducer(initialState, tick());
        expect(actual.area.snakePosition).toStrictEqual([5, 4]);
    });
});
