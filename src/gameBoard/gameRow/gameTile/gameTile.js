import React from 'react'
import classes from './gameTile.module.css'

const GameTile = (props) => {
    return (
        <div className={classes.GameTileContainer}>
            {props.row1.map( (letter, index) => (
                <p className={classes.GameTile} key={index}>{letter}</p>
            ))}
        </div>
    )
}


export default GameTile