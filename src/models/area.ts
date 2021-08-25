import { Snake } from './snake';

declare type Position = [number, number];

export class Area {
    public readonly height: number;
    public readonly width: number;

    public readonly snake: Snake;

    public readonly snakePosition: Position;

    public constructor(height: number, width: number);
    public constructor(height: number, width: number, snake: Snake, position: Position);
    public constructor(height: number, width: number, snake?: Snake, position?: Position) {
        this.snake = snake ?? new Snake();

        this.height = height;
        this.width = width;

        this.snakePosition = position ?? [
            (height / 2) | 0,
            (width / 2) | 0,
        ];
    }
}
