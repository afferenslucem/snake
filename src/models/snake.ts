import { CellDirection } from './cell-direction';
import _, { ISequence } from 'declarray';

export class Snake {
    public readonly body: CellDirection[];

    public constructor();
    public constructor(body: CellDirection[]);
    public constructor(body: CellDirection[], nextDirection: CellDirection, previousTail: CellDirection);
    public constructor(body: CellDirection[] = [CellDirection.Up], nextDirection?: CellDirection, previousTail?: CellDirection) {
        this.body = body;
        this.nextDirection = nextDirection || this.headDirection;
        this.previousTail = this.body.length === 1 ? this.headDirection : previousTail;
    }

    public readonly nextDirection: CellDirection;
    public readonly previousTail: CellDirection;

    public get headDirection(): CellDirection {
        return _(this.body).first();
    }

    public get tailDirection(): CellDirection {
        return _(this.body).last();
    }

    public get length(): number {
        return this.body.length;
    }

    public get isVertical(): boolean {
        return this.headDirection === CellDirection.Up || this.headDirection === CellDirection.Down;
    }

    public get isHorizontal(): boolean {
        return this.headDirection === CellDirection.Left || this.headDirection === CellDirection.Right;
    }

    public up(): Snake {
        if (this.isVertical && this.length > 1) {
            return this;
        } else return this.turnSnake(CellDirection.Up)
    }

    public right(): Snake {
        if (this.isHorizontal && this.length > 1) {
            return this;
        } else return this.turnSnake(CellDirection.Right)
    }

    public down(): Snake {
        if (this.isVertical && this.length > 1) {
            return this;
        } else return this.turnSnake(CellDirection.Down)
    }

    public left(): Snake {
        if (this.isHorizontal && this.length > 1) {
            return this;
        } else return this.turnSnake(CellDirection.Left)
    }

    public grow(): Snake {
        const newBody = _(this.body).append(this.previousTail).toArray();
        return new Snake(newBody, null, this.previousTail);
    }

    public move(): Snake {
        const turnedHead = this.turnHead()
        const newBody = this.makeStep(turnedHead).toArray();
        return new Snake(newBody, undefined, this.tailDirection);
    }

    private turnHead(): ISequence<CellDirection> {
        return _(this.body).skip(1).prepend(this.nextDirection);
    }

    private makeStep(body: ISequence<CellDirection>): ISequence<CellDirection> {
        return body.skipLast(1).prepend(this.nextDirection);
    }

    private turnSnake(direction: CellDirection): Snake {
        return new Snake(this.body, direction, this.previousTail);
    }
}
