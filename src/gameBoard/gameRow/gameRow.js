import React from 'react'
import classes from './gameRow.module.css'
import GameTile from './gameTile/gameTile'

const GameRow = (props) => {

    return (
        <div className={classes.GameRow}>
            <GameTile row1={props.row1}/>
        </div>
    )
};


export default GameRow;