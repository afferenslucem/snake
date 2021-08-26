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

                    setRepeater(started,Math.pow(0.9, newSpeed) * defaultInterval);
                }

                store.dispatch(tick())
            },
            period
        ).start();

        return () => repeater.kill();
    } else {
        return () => {};
    }
}


function App() {
    useEffect(() => {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp": {
                    store.dispatch(turnUp());
                    break;
                }
                case "ArrowDown": {
                    store.dispatch(turnDown());
                    break;
                }
                case "ArrowRight": {
                    store.dispatch(turnRight());
                    break;
                }
                case "ArrowLeft": {
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
            <div>
                <Field/>
            </div>
            <button onClick={() => dispatch(startGame())}>Start</button>
            <Controller
                onDownMove={() => dispatch(turnDown())}
                onLeftMove={() => dispatch(turnLeft())}
                onUpMove={() => dispatch(turnUp())}
                onRightMove={() => dispatch(turnRight())}
            />
        </div>
    );
}

export default App;
