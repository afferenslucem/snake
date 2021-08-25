import { Snake } from './snake';
import { CellDirection } from './cell-direction';
import _ from 'declarray';
import { GameOver } from '../errors/game-over';

declare type Position = [number, number];

interface AreaArgs {
    snake?: Snake;
    snakePosition?: Position;
    foodCells?: Position[];
}

export class Area {
    public readonly height: number;
    public readonly width: number;

    public readonly snake: Snake;

    public readonly snakeCells: Position[];
    public readonly foodCells: Position[];

    public readonly snakePosition: Position;

    private get snakeHead(): CellDirection {
        return this.snake.head;
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

        this.foodCells = args?.foodCells ?? [];
    }

    public tick(): Area {
        const nextCell = this.getNextSnakePosition();

        if (!this.checkBounds(nextCell)) {
            throw new GameOver('You break area beyond');
        }

        if (this.isSnakeCell(nextCell)) {
            throw new GameOver('You did eat yourself');
        }

        return undefined;
    }

    public isSnakeCell([x, y]: Position): boolean {
        return  _(this.snakeCells).any(([s_X, s_Y]) => s_X === x && s_Y === y);
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

        switch (this.snakeHead) {
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
