import React from 'react';
import _ from 'declarray';
import Cell from '../Cell/Cell';
import './Field.scss';

const renderArray = _.range(0, 30).select(() => _.range(0, 30).toArray()).toArray();

function renderRow(row: Array<any>, rowIndex: number) {
    return row.map((cell, cellIndex) => (
        <Cell rowIndex={rowIndex} cellIndex={cellIndex}/>
    ));
}

export default function Field() {
    return (
        <div className="app-field">
            {
                renderArray.map((row, rowIndex) => renderRow(row, rowIndex))
            }
        </div>
    )
}
