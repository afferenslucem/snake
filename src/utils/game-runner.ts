import { store } from '../app/store';
import { Repeater } from 'essents';
import { initField, tickField } from '../components/Area/Field/field-slice';
import { GameOver } from '../errors/game-over';
import { changeSpeed, endGame, startGame } from '../components/Area/Field/game-slice';
import { ScoreCalculator } from './score-calculator';
import { addScore, resetScore } from '../components/Score/score-slice';

export class RunnerUtils {
    public selectLength(): number {
        return store.getState().field.area.snake.body.length;
    }

    public selectSpeed(): number {
        return store.getState().game.speed;
    }

    public chooseSpeed() {
        const length = this.selectLength();

        return 1 + ((length / 4) | 0);
    }
}

export class GameRunner {
    public utils: RunnerUtils = new RunnerUtils();

    public readonly defaultPeriod = 750;

    public period: number = null;

    public repeater: Repeater = null;

    public previousLength: number = null;

    public init(): void {
        store.dispatch(initField());
        store.dispatch(resetScore());
        this.previousLength = this.utils.selectLength();
    }

    public run(): void {
        this.repeater = new Repeater(() => this.iteration(), this.period ?? this.defaultPeriod).start();
    }

    public startGame(): void {
        store.dispatch(startGame())
        this.run();
    }

    public iteration(): void {
        const speed = this.utils.selectSpeed();
        const newSpeed = this.utils.chooseSpeed();
        const length = this.utils.selectLength();

        if (this.previousLength !== length) {
            this.changeScore(speed);
        }
        if (speed !== newSpeed) {
            this.changeSpeed(newSpeed);
        }

        this.previousLength = length;

        try {
            store.dispatch(tickField())
        } catch (e) {
            if (e instanceof GameOver) {
                store.dispatch(endGame(e.message));
                this.stop();
                this.init();
            }
        }
    }

    public changeScore(speed: number): void {
        const score = new ScoreCalculator().getAdditionalScore(speed);
        store.dispatch(addScore(score));
    }

    public changeSpeed(newSpeed: number): void {
        this.stop()
        this.period = Math.pow(0.9, newSpeed) * this.defaultPeriod;
        store.dispatch(changeSpeed(newSpeed));
        this.run();
    }

    public stop(): void {
        this.repeater.kill();
    }
}
