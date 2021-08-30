import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectScore } from './score-slice';
import { selectSnakeLength } from '../Area/Field/field-slice';
import { selectSpeed } from '../Area/Field/game-slice';

export default function Score() {
    const score = useAppSelector(selectScore);
    const length = useAppSelector(selectSnakeLength);
    const speed = useAppSelector(selectSpeed);

    return (
        <div className="app-score">
            <div className="score-info">
                <label className="score-info__header">
                    Score
                </label>
                <div className="score-info__value">
                    {score}
                </div>
            </div>
            <div className="snake-speed-info">
                <label className="snake-speed-info__header">
                    Speed
                </label>
                <div className="snake-speed-info__value">
                    {speed}
                </div>
            </div>
            <div className="snake-length-info">
                <label className="snake-length-info__header">
                    Length
                </label>
                <div className="snake-length-info__value">
                    {length}
                </div>
            </div>
        </div>
    )
}
