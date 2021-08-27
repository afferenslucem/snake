import { fromEvent, merge, Observable, Subject, Subscribable, Subscription } from 'rxjs';
import { CellDirection } from '../models/cell-direction';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { turnDown, turnLeft, turnRight, turnUp } from '../components/Area/Field/field-slice';
import { store } from '../app/store';

export class SnakeController {
    public moves$: Observable<CellDirection>;

    private keyPress$: Observable<CellDirection>;
    private controllerChange$ = new Subject<CellDirection>();

    private dead$ = new Subject<void>();

    public init(): void {
        this.keyPress$ = this.subscribeToKeys();

        this.moves$ = merge(
            this.keyPress$,
            this.controllerChange$
        ).pipe(
            distinctUntilChanged((first, second) => first === second),
            takeUntil(this.dead$),
        )

        this.moves$.subscribe((direction: CellDirection) => {
            switch (direction) {
                case CellDirection.Up: {
                    store.dispatch(turnUp());
                    break;
                }
                case CellDirection.Down: {
                    store.dispatch(turnDown());
                    break;
                }
                case CellDirection.Right: {
                    store.dispatch(turnRight());
                    break;
                }
                case CellDirection.Left: {
                    store.dispatch(turnLeft());
                    break;
                }
            }
        });
    }

    private subscribeToKeys(): Observable<CellDirection> {
        return fromEvent<KeyboardEvent>(document, 'keydown').pipe(
            map(item => item.key),
            map(item => {
                switch (item) {
                    case "ArrowUp":
                        return CellDirection.Up;
                    case "ArrowDown":
                        return CellDirection.Down;
                    case "ArrowRight":
                        return CellDirection.Right;
                    case "ArrowLeft":
                        return CellDirection.Left;
                }
            }),
        );
    }

    public turnUp(): void {
        this.controllerChange$.next(CellDirection.Up)
    }

    public turnRight(): void {
        this.controllerChange$.next(CellDirection.Right)
    }

    public turnDown(): void {
        this.controllerChange$.next(CellDirection.Down)
    }

    public turnLeft(): void {
        this.controllerChange$.next(CellDirection.Left)
    }

    public unsubscribe(): void {
        this.dead$.next();
        this.dead$.complete();
    }
}
