import sinon from 'sinon';
import Sinon from 'sinon';
import { store } from '../app/store';
import { GameRunner } from './game-runner';
import { initField, tickField } from '../components/Area/Field/field-slice';
import { endGame, startGame } from '../components/Area/Field/game-slice';
import { GameOver } from '../errors/game-over';

describe('GameRunner', () => {
    let dispatchSpy: Sinon.SinonStub<any> = null;
    let runner: GameRunner = null;
    beforeEach(() => {
        runner = new GameRunner();
        dispatchSpy = sinon.stub(store, 'dispatch');
    })

    test('init should dispatch initField', () => {
        runner.init();

        expect(dispatchSpy.calledOnceWith(initField())).toBeTruthy();
    })

    test('run should dispatch startGame', () => {
        runner.run();

        expect(dispatchSpy.calledOnceWith(startGame())).toBeTruthy();
        expect(runner.repeater).toBeTruthy();
        expect(runner.repeater.alive).toBeTruthy();
    })

    describe('iteration', () => {
        test('should change speed', () => {
            sinon.stub(runner.utils, 'selectSpeed').returns(3);
            sinon.stub(runner.utils, 'chooseSpeed').returns(5);
            const changeSpeedSpy = sinon.stub(runner, 'changeSpeed');

            runner.iteration();

            expect(changeSpeedSpy.calledOnce).toBeTruthy();
            expect(dispatchSpy.calledOnceWith(tickField())).toBeTruthy();
        });

        test('should save speed', () => {
            sinon.stub(runner.utils, 'selectSpeed').returns(3);
            sinon.stub(runner.utils, 'chooseSpeed').returns(3);
            const changeSpeedSpy = sinon.stub(runner, 'changeSpeed');

            runner.iteration();

            expect(changeSpeedSpy.notCalled).toBeTruthy();
            expect(dispatchSpy.calledOnceWith(tickField())).toBeTruthy();
        });

        test('should stop game', () => {
            sinon.stub(runner.utils, 'selectSpeed').returns(3);
            sinon.stub(runner.utils, 'chooseSpeed').returns(3);
            dispatchSpy.onFirstCall().throws(() => new GameOver('stop'))
            const stopSpy = sinon.stub(runner, 'stop');

            runner.iteration();

            expect(stopSpy.calledOnce).toBeTruthy();
            expect(dispatchSpy.calledTwice).toBeTruthy();
            expect(dispatchSpy.calledWith(tickField())).toBeTruthy();
            expect(dispatchSpy.calledWith(endGame('stop'))).toBeTruthy();
        });
    });

    test('changeSpeed', () => {
        const stopSpy = sinon.stub(runner, 'stop');
        const runSpy = sinon.stub(runner, 'run');

        runner.changeSpeed(2);

        expect(runner.period).toBe(0.81 * 750);
        expect(stopSpy.calledOnce).toBeTruthy();
        expect(runSpy.calledOnce).toBeTruthy();
    });

    test('stop should kill repeater', () => {
        runner.run();

        const killSpy = sinon.stub(runner.repeater, 'kill');

        runner.stop();

        expect(killSpy.calledOnce).toBeTruthy();
    });

    afterEach(() => {
        dispatchSpy.restore();

        if (runner.repeater?.alive) {
            runner.stop();
        }
    })
})
