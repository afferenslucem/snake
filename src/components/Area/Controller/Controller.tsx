import React, { MouseEvent } from 'react';
import './Controller.scss';
import classNames from 'classnames';
import { fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface State {
    x: number;
    y: number;
    direction: string;
}

interface Props {
    onUpMove: () => void;
    onRightMove: () => void;
    onDownMove: () => void;
    onLeftMove: () => void;
}

export default class Controller extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            x: null,
            y: null,
            direction: null,
        }

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    public componentDidMount() {
        merge(
            fromEvent(document, 'mouseup'),
            fromEvent(document, 'touchend'),
        ).subscribe((e) => this.onMouseUp());

        merge(
            fromEvent(document, 'mousemove'),
            fromEvent(document, 'touchmove'),
        ).pipe(debounceTime(100)).subscribe((e) => this.onMouseMove(e as any));
    }

    public onMouseDown(e: any) {
        const x = e.screenX ?? e.touches[0].screenX
        const y = e.screenY ?? e.touches[0].screenY

        this.setState(() => ({ x, y }))
    }

    public onMouseMove(e: any) {
        const { x, y } = this.state;

        if (!x || !y) return;

        const screenX = e.screenX ?? e.touches[0].screenX
        const screenY = e.screenY ?? e.touches[0].screenY

        const xDiff = x - screenX;
        const yDiff = y - screenY;

        if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) {
            this.props.onLeftMove();
            this.setState(() => ({ direction: 'left' }));
        } else if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) {
            this.props.onRightMove();
            this.setState(() => ({ direction: 'right' }));
        } else if (Math.abs(xDiff) < Math.abs(yDiff) && yDiff < 0) {
            this.props.onDownMove();
            this.setState(() => ({ direction: 'down' }));
        } else if (Math.abs(xDiff) < Math.abs(yDiff) && yDiff > 0) {
            this.props.onUpMove();
            this.setState(() => ({ direction: 'up' }));
        }
    }

    public onMouseUp() {
        this.setState(() => ({ x: null, y: null, direction: null }))
    }

    render() {
        return (
            <div
                className={classNames("app-controller", this.state.direction)}
            >
                <div className="app-controller__top arrow control"> </div>
                <div className="app-controller__right arrow control"> </div>
                <div className="app-controller__bottom arrow control"> </div>
                <div className="app-controller__left arrow control"> </div>
                <div className="app-controller__cursor-placeholder">
                    <div className="app-controller__cursor control"
                         onMouseDown={this.onMouseDown}
                         onTouchStart={this.onMouseDown}
                    > </div>
                </div>
            </div>
        );
    }
}
