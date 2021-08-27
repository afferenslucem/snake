import sinon from 'sinon';
import { store } from '../app/store';
import Sinon from 'sinon';
import { SnakeController } from './snake-controller';
import { fireEvent } from '@testing-library/react';
import { turnDown, turnLeft, turnRight, turnUp } from '../components/Area/Field/field-slice';


describe('SnakeController', () => {
    let dispatchSpy: Sinon.SinonStub<any> = null;
    let controller: SnakeController = null;

    beforeEach(async () => {
        dispatchSpy = sinon.stub(store, 'dispatch');
        controller = new SnakeController();
        controller.init();
    });

    describe('keydown', () => {
        test('arrowUp', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnUp())).toBeTruthy();
                done();
            });

            fireEvent.keyDown(document, {
                key: "ArrowUp"
            })
        });

        test('arrowRight', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnRight())).toBeTruthy();
                done();
            });

            fireEvent.keyDown(document, {
                key: "ArrowRight"
            })
        });

        test('arrowDown', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnDown())).toBeTruthy();
                done();
            });

            fireEvent.keyDown(document, {
                key: "ArrowDown"
            })
        });

        test('arrowLeft', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnLeft())).toBeTruthy();
                done();
            });

            fireEvent.keyDown(document, {
                key: "ArrowLeft"
            })
        });
    });

    describe('manual', () => {
        test('up', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnUp())).toBeTruthy();
                done();
            });

            controller.turnUp();
        });

        test('right', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnRight())).toBeTruthy();
                done();
            });

            controller.turnRight();
        });

        test('down', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnDown())).toBeTruthy();
                done();
            });

            controller.turnDown();
        });

        test('left', (done) => {
            controller.moves$.subscribe(() => {
                expect(dispatchSpy.calledOnceWith(turnLeft())).toBeTruthy();
                done();
            });

            controller.turnLeft();
        });
    });

    afterEach(async () => {
        dispatchSpy.restore();
        controller.unsubscribe();
    });
});
