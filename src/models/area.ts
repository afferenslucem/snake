import { Snake } from './snake';
import { CellDirection } from './cell-direction';
import _, { IEqualityComparator } from 'declarray';
import { GameOver } from '../errors/game-over';
import { Random } from 'essents';

declare type Position = [number, number];

interface AreaArgs {
    snake?: Snake;
    snakePosition?: Position;
    foodCells?: Position[];
}

class PositionComparator implements IEqualityComparator<Position> {
    compare(first: Position, second: Position): number {
        if (first[0] > second[0]) {
            return 1;
        } else if (first[0] < second[0]) {
            return -1;
        } else {
            return first[1] - second[1];
        }
    }

    equals(first: Position, second: Position): boolean {
        return first[0] === second[0] && first[1] === second[1];
    }

    getHashCode(entity: Position): number {
        return (entity[0] + 1024) * (entity[1] + 512)
    }
}

export class Area {
    public readonly height: number;
    public readonly width: number;

    public readonly snake: Snake;

    public readonly snakeCells: Position[];
    public foodCells: Position[];

    public readonly snakePosition: Position;

    private readonly rnd: Random = new Random();

    private get snakeHeadDirection(): CellDirection {
        return this.snake.head;
    }
    private get snakeTail(): Position {
        return _(this.snakeCells).last();
    }

    public constructor(height: number, width: number);
    public constructor(height: number, width: number, args: AreaArgs);
    public constructor(height: number, width: number, args?: AreaArgs) {
        this.height = height;
        this.width = width;

        this.snake = args?.snake ?? new Snake();
        this.snakePosition = args?.snakePosition ?? [
            (height / 2) | 0,
            (width / 2) | 0,
        ];

        this.snakeCells = this.getSnakeCells();

        this.foodCells = args?.foodCells?.length ? args.foodCells : [this.generateRandomFreeCell()];
    }

    public tick(): Area {
        const nextCell = this.getNextSnakePosition();

        if (!this.checkBounds(nextCell)) {
            throw new GameOver('You break area beyond');
        }

        if (this.isSnakeCell(nextCell) && !new PositionComparator().equals(nextCell, this.snakeTail)) {
            throw new GameOver('You did eat yourself');
        }

        let snake = this.snake.move();

        if (this.isFoodCell(nextCell)) {
            snake = snake.grow();

            this.foodCells = _(this.foodCells).where((cell) => !new PositionComparator().equals(nextCell, cell)).toArray();
        }

        return new Area(
            this.height,
            this.width,
            {
                snake: snake,
                snakePosition: nextCell,
                foodCells: this.foodCells,
            }
        )
    }

    public turnUp(): Area {
        return new Area(
            this.height,
            this.width,
            {
                snake: this.snake.up(),
                snakePosition: this.snakePosition,
                foodCells: this.foodCells,
            }
        )
    }

    public turnRight(): Area {
        return new Area(
            this.height,
            this.width,
            {
                snake: this.snake.right(),
                snakePosition: this.snakePosition,
                foodCells: this.foodCells,
            }
        )
    }

    public turnDown(): Area {
        return new Area(
            this.height,
            this.width,
            {
                snake: this.snake.down(),
                snakePosition: this.snakePosition,
                foodCells: this.foodCells,
            }
        )
    }

    public turnLeft(): Area {
        return new Area(
            this.height,
            this.width,
            {
                snake: this.snake.left(),
                snakePosition: this.snakePosition,
                foodCells: this.foodCells,
            }
        )
    }

    public isSnakeCell(cell: Position): boolean {
        return  _(this.snakeCells).contains(cell, new PositionComparator());
    }

    public isFoodCell(cell: Position): boolean {
        return  _(this.foodCells).contains(cell, new PositionComparator());
    }

    public generateRandomFreeCell(): Position {
        let cell: Position = null;

        do {
            const x = this.rnd.next(this.width);
            const y = this.rnd.next(this.height);

            cell = [x, y];
        } while (this.isSnakeCell(cell))

        return cell;
    }

    public checkBounds(position: Position): boolean {
        const [x, y] = position;
        if (x < 0 || x >= this.width) {
            return false;
        } else if (y < 0 || y >= this.height) {
            return false;
        } else {
            return true;
        }
    }

    public getNextSnakePosition(): Position {
        const coord = this.snakePosition;

        switch (this.snakeHeadDirection) {
            case CellDirection.Up: return [coord[0], coord[1] - 1];
            case CellDirection.Right: return [coord[0] + 1, coord[1]];
            case CellDirection.Down: return [coord[0], coord[1] + 1];
            case CellDirection.Left: return [coord[0] - 1, coord[1]];
        }
    }

    public getSnakeCells(): Position[] {
        const coords = [this.snakePosition];

        let last = this.snakePosition;

        for (let i = 1; i < this.snake.body.length; i++) {
            last = this.getNextSectionCoord(last, this.snake.body[i]);
            coords.push(last);
        }

        return coords;
    }

    private getNextSectionCoord(coord: Position, section: CellDirection): Position {
        switch (section) {
            case CellDirection.Up: return [coord[0], coord[1] + 1];
            case CellDirection.Right: return [coord[0] - 1, coord[1]];
            case CellDirection.Down: return [coord[0], coord[1] - 1];
            case CellDirection.Left: return [coord[0] + 1, coord[1]];
        }
    }
}
