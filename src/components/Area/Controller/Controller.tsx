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
        fromEvent(document, 'mouseup').subscribe((e) => this.onMouseUp());

        fromEvent(document, 'mousemove').pipe(debounceTime(100)).subscribe((e) => this.onMouseMove(e as any));
    }

    public onMouseDown(e: MouseEvent) {
        this.setState(() => ({ x: e.screenX, y: e.screenY }))
    }

    public onMouseMove(e: MouseEvent) {
        const { x, y } = this.state;

        if (!x || !y) return;

        const minDiff = 5;

        const xDiff = x - e.screenX;
        const yDiff = y - e.screenY;

        if (xDiff < minDiff && yDiff < minDiff) return;

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
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
            >
                <div className="app-controller__top arrow control"></div>
                <div className="app-controller__right arrow control"></div>
                <div className="app-controller__bottom arrow control"></div>
                <div className="app-controller__left arrow control"></div>
                <div className="app-controller__cursor-placeholder">
                    <div className="app-controller__cursor control"
                         onMouseDown={this.onMouseDown}
                    ></div>
                </div>
            </div>
        );
    }
}
