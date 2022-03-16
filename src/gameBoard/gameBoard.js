import classes from './gameBoard.module.css';
import React from 'react'

import GameRow from './gameRow/gameRow'

const gameBoard = (props) => {
    return (
        <div className={classes.BoardContainer}>
            <div className={classes.Board}>
                <GameRow row1={props.row1}/>
                <GameRow row1={props.row1}/>
                <GameRow row1={props.row1}/>
                <GameRow row1={props.row1}/>
                <GameRow row1={props.row1}/>
                <GameRow row1={props.row1}/>
                
            </div>
            
        </div>
    );
};

export default gameBoard;