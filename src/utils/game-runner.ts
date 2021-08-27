import { store } from '../app/store';
import { Repeater } from 'essents';
import { initField, tickField } from '../components/Area/Field/field-slice';
import { GameOver } from '../errors/game-over';
import { endGame, startGame } from '../components/Area/Field/game-slice';

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

    public init(): void {
        store.dispatch(initField())
    }

    public run(): void {
        store.dispatch(startGame())
        this.repeater = new Repeater(() => this.iteration(), this.period ?? this.defaultPeriod).start();
    }

    public iteration(): void {
        const speed = this.utils.selectSpeed();
        const newSpeed = this.utils.chooseSpeed();

        if (speed !== newSpeed) {
            this.changeSpeed(newSpeed);
        }

        try {
            store.dispatch(tickField())
        } catch (e) {
            if (e instanceof GameOver) {
                store.dispatch(endGame(e.message));
                this.stop();
            }
        }
    }

    public changeSpeed(newSpeed: number): void {
        this.stop()

        this.period = Math.pow(0.9, newSpeed) * this.defaultPeriod;

        this.run();
    }

    public stop(): void {
        this.repeater.kill();
    }
}
