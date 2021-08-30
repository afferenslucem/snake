import React, { useEffect } from 'react';
import Field from './components/Area/Field/field';
import { useAppSelector } from './app/hooks';
import Controller from './components/Controller/Controller';
import { selectGameOvered, selectGameStarted } from './components/Area/Field/game-slice';
import { GameRunner } from './utils/game-runner';
import { SnakeController } from './utils/snake-controller';
import Score from './components/Score/Score';

const gameRunner = new GameRunner();
const controller = new SnakeController();

function App() {
    useEffect(() => {
        controller.init();
    })

    const started = useAppSelector(selectGameStarted);
    const gameOver = useAppSelector(selectGameOvered);
    return (
        <div className="App">
            <div className="app-game-place">
                <Field/>
                {
                    started ? <Score/> : null
                }
            </div>
            {
                !started ? (
                    <button
                        className="start-game"
                        onClick={() => {
                            gameRunner.startGame();
                        }}
                    >
                        Start
                    </button>
                ) : (
                    <Controller
                        onUpMove={() => controller.turnUp()}
                        onRightMove={() => controller.turnRight()}
                        onDownMove={() => controller.turnDown()}
                        onLeftMove={() => controller.turnLeft()}
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
