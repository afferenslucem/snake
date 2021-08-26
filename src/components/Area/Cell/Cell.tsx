import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import classNames from 'classnames';
import { selectIsFoodCell, selectIsSnakeCell } from '../Field/fieldSlice';

interface Props {
    rowIndex: number;
    cellIndex: number;
}

export default function Cell(props: Props) {
    const  isSnakeSelector = useAppSelector(selectIsSnakeCell);
    const  isFoodSelector = useAppSelector(selectIsFoodCell);

    const isSnake = isSnakeSelector([props.cellIndex, props.rowIndex]);
    const isFood = isFoodSelector([props.cellIndex, props.rowIndex]);

    const cellClasses = classNames({
        'app-cell': true,
        'snake-cell': isSnake,
        'food-cell': isFood,
    });

    return (
        <div className={cellClasses}> </div>
    )
}
