import React, { useEffect } from 'react';
import Field from './components/Area/Field/field';
import { useAppSelector } from './app/hooks';
import { turnDown, turnLeft, turnRight, turnUp } from './components/Area/Field/field-slice';
import { store } from './app/store';
import Controller from './components/Area/Controller/Controller';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CellDirection } from './models/cell-direction';
import { selectGameOvered, selectGameStarted } from './components/Area/Field/game-slice';
import { GameRunner } from './utils/game-runner';

const gameRunner = new GameRunner();

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

const turn$ = merge(keyDown$, controllerChange$).pipe(distinctUntilChanged((first, second) => first === second));

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
    const gameOver = useAppSelector(selectGameOvered);
    return (
        <div className="App">
            <Field/>
            {
                !started ? (
                    <button
                        className="start-game"
                        onClick={() => {
                            gameRunner.init();
                            gameRunner.run();
                        }}
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
            {
                gameOver ?
                    <span>{gameOver}</span> :
                    null
            }
        </div>
    );
}

export default App;
