import classes from './gameBoard.module.css';
import React from 'react'

import GameRow from './gameRow/gameRow.module'

const gameBoard = (props) => {
    return (
        <div className={classes.BoardContainer}>
            <div className={classes.Board}>
                {props.rows.map( (row, index) => (
                    <GameRow 
                        row={row}
                        key={index}
                        rowReveal={props.rowsReveal[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default gameBoard;