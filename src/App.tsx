import React, { useEffect } from 'react';
import Field from './components/Area/Field/Field';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
    selectGameStarted,
    startGame,
    tick,
    turnDown,
    turnLeft,
    turnRight,
    turnUp
} from './components/Area/Field/fieldSlice';
import { Repeater } from 'essents';
import { store } from './app/store';
import Controller from './components/Area/Controller/Controller';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CellDirection } from './models/cell-direction';

const defaultInterval = 750;

function selectLength(): number {
    return store.getState().field.area.snake.body.length;
}

function selectSpeed(): number {
    return store.getState().field.speed;
}

function chooseSpeed() {
    const length = selectLength()

    return 1 + ((length / 4) | 0);
}

let repeater: Repeater = null;

function setRepeater(started: boolean, period = defaultInterval): () => void {
    if (started) {
        repeater = new Repeater(
            () => {
                const speed = selectSpeed();
                const newSpeed = chooseSpeed();

                if (speed !== newSpeed) {
                    repeater.kill();

                    setRepeater(started, Math.pow(0.9, newSpeed) * defaultInterval);
                }

                store.dispatch(tick())
            },
            period
        ).start();

        return () => repeater.kill();
    } else {
        return () => {
        };
    }
}

const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    debounceTime(100),
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

const controllerChange$ = new Subject<CellDirection>();

const turn$ = merge(keyDown$, controllerChange$).pipe(debounceTime(200), distinctUntilChanged((first, second) => first === second));

function App() {
    useEffect(() => {
        turn$.subscribe((direction: CellDirection) => {
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
    });

    const started = useAppSelector(selectGameStarted);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return setRepeater(started);
    });

    return (
        <div className="App">
            <Field/>
            {
                !started ? (
                    <button
                        className="start-game"
                        onClick={() => dispatch(startGame())}
                    >
                        Start
                    </button>
                ) : (
                    <Controller
                        onDownMove={() => controllerChange$.next(CellDirection.Down)}
                        onLeftMove={() => controllerChange$.next(CellDirection.Left)}
                        onUpMove={() => controllerChange$.next(CellDirection.Up)}
                        onRightMove={() => controllerChange$.next(CellDirection.Right)}
                    />
                )
            }
        </div>
    );
}

export default App;
