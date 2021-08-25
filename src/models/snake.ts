import { CellDirection } from './cell-direction';
import _ from 'declarray';

export class Snake {
    public readonly body: CellDirection[];

    public constructor();
    public constructor(body: CellDirection[]);
    public constructor(body: CellDirection[] = [CellDirection.Up]) {
        this.body = body;
    }

    public get head(): CellDirection {
        return _(this.body).first();
    }

    public get last(): CellDirection {
        return _(this.body).last();
    }

    public get isVertical(): boolean {
        return this.head === CellDirection.Up || this.head === CellDirection.Down;
    }

    public get isHorizontal(): boolean {
        return this.head === CellDirection.Left || this.head === CellDirection.Right;
    }

    public up(): Snake {
        if (this.isVertical) {
            return this;
        } else return this.moveSnake(CellDirection.Up)
    }

    public right(): Snake {
        if (this.isHorizontal) {
            return this;
        } else return this.moveSnake(CellDirection.Right)
    }

    public down(): Snake {
        if (this.isVertical) {
            return this;
        } else return this.moveSnake(CellDirection.Down)
    }

    public left(): Snake {
        if (this.isHorizontal) {
            return this;
        } else return this.moveSnake(CellDirection.Left)
    }

    public grow(): Snake {
        const newBody = _(this.body).append(this.last).toArray();
        return new Snake(newBody);
    }

    public move(): Snake {
        const newBody = _(this.body).skipLast(1).prepend(this.head).toArray();
        return new Snake(newBody);
    }

    private moveSnake(direction: CellDirection): Snake {
        this.body.pop()
        const newBody = [direction, ...this.body];
        return new Snake(newBody);
    }
}
